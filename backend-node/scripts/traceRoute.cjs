// Step-by-step routing trace

const http = require('http');
const loginData = JSON.stringify({email:'admin@dernseed.com',password:'Admin123!'});

const req = http.request({
  hostname: 'localhost', port: 8000, path: '/api/auth/login', method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(loginData) }
}, (res) => {
  const rawCookies = res.headers['set-cookie'] || [];
  let cookieStr = '';
  for (const c of rawCookies) {
    if (c.startsWith('dern_session=')) {
      cookieStr = c.split(';')[0];
      break;
    }
  }
  console.log('=== LOGIN SUCCESSFUL, COOKIE:', cookieStr);
  
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    // Now let's trace what happens step by step
    const sessions = [
      { name: '/api/users (requireAdmin)', path: '/api/users' },
      { name: '/api/employees (requireAdmin)', path: '/api/employees' },
      { name: '/api/dashboard/admin-stats (requireAdmin)', path: '/api/dashboard/admin-stats' },
      { name: '/api/farmers (requireStaff)', path: '/api/farmers' },
      { name: '/api/orders (requireAuth)', path: '/api/orders' },
      { name: '/api/users/me (requireAuth)', path: '/api/users/me' },
    ];
    
    // Test each one in separate HTTP connections
    let idx = 0;
    function testNext() {
      if (idx >= sessions.length) return;
      const s = sessions[idx++];
      
      // Use raw TCP to send HTTP request and see full response
      const sr = http.get(`http://localhost:8000${s.path}`, { headers: { 'Cookie': cookieStr } }, (srRes) => {
        let d = '';
        srRes.on('data', chunk => d += chunk);
        srRes.on('end', () => {
          console.log(`${s.name}`);
          console.log(`  Status: ${srRes.statusCode}`);
          // Check if there's a set-cookie again (session might be refreshed)
          if (srRes.headers['set-cookie']) {
            console.log(`  Set-Cookie: ${srRes.headers['set-cookie'].join('; ').substring(0, 60)}...`);
          }
          console.log(`  User-Agent sent: Node.js`);
          console.log(`  Response: ${d.substring(0, 150)}`);
          console.log('');
          setTimeout(testNext, 50);
        });
      });
      sr.on('error', e => {
        console.log(`${s.name} => ERROR: ${e.message}`);
        setTimeout(testNext, 50);
      });
    }
    
    testNext();
  });
});
req.write(loginData);
req.end();

