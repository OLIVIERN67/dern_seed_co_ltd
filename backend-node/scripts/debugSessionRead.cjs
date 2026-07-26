// Debug: Read session rows from DB directly
const mysql = require("mysql2/promise");
const http = require("http");

async function main() {
  // First, login to get a session
  const loginData = JSON.stringify({email:'admin@dernseed.com',password:'Admin123!'});
  
  const cookieStr = await new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost', port: 8000, path: '/api/auth/login', method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(loginData) }
    }, (res) => {
      const rawCookies = res.headers['set-cookie'] || [];
      for (const c of rawCookies) {
        if (c.startsWith('dern_session=')) {
          resolve(c.split(';')[0]);
        }
      }
      reject(new Error('No cookie'));
    });
    req.write(loginData);
    req.end();
  });
  
  console.log('Cookie:', cookieStr);
  const token = cookieStr.split('=')[1];
  console.log('Token:', token);

  // Now connect to DB and read the session rows
  const c = await mysql.createConnection({
    host: "127.0.0.1", port: 3306, user: "root", password: "", database: "derneseedcoltd"
  });

  const [rows] = await c.execute(
    `SELECT id, user_id, session_token, expires_at, revoked_at, created_at, last_seen_at 
     FROM sessions 
     WHERE session_token = ?`,
    [token]
  );
  
  console.log('\nSession rows matching our token:');
  console.log(JSON.stringify(rows, null, 2));
  console.log('Count:', rows.length);

  if (rows.length > 0) {
    const row = rows[0];
    console.log('\nDetailed checks:');
    console.log('- revoked_at:', row.revoked_at, '-> is null?', row.revoked_at === null);
    console.log('- expires_at:', row.expires_at);
    const expiresAt = new Date(row.expires_at);
    console.log('- expiresAt.getTime():', expiresAt.getTime());
    console.log('- Date.now():', Date.now());
    console.log('- expired?', expiresAt.getTime() < Date.now());
    
    // Check if we can find the session with 2nd query (simulating 2nd request)
    const [rows2] = await c.execute(
      `SELECT id, user_id, session_token, expires_at, revoked_at
       FROM sessions 
       WHERE session_token = ?`,
      [token]
    );
    console.log('\nSecond query (simulating 2nd request):');
    console.log('Count:', rows2.length);
    if (rows2.length > 0) {
      console.log('Found!', JSON.stringify(rows2[0]));
    } else {
      console.log('NOT FOUND - token not in DB on second query!');
    }
  }

  // Also list ALL sessions to see if there are multiple
  const [allSessions] = await c.execute(
    `SELECT id, user_id, LEFT(session_token, 30) AS token_prefix, expires_at, revoked_at 
     FROM sessions 
     ORDER BY created_at DESC`
  );
  console.log('\nAll sessions in DB:');
  console.log(JSON.stringify(allSessions, null, 2));

  await c.end();
}

main().catch(e => console.error('Error:', e));

