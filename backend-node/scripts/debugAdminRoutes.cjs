// Debug why admin routes fail
const http = require('http');

const loginData = JSON.stringify({email:'admin@dernseed.com',password:'Admin123!'});
const loginReq = http.request({
  hostname: 'localhost',
  port: 8000,
  path: '/api/auth/login',
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(loginData) }
}, (loginRes) => {
  const rawCookies = loginRes.headers['set-cookie'] || [];
  let cookieStr = '';
  for (const c of rawCookies) {
    if (c.startsWith('dern_session=')) {
      cookieStr = c.split(';')[0];
      break;
    }
  }
  console.log('Cookie:', cookieStr);
  
  let body = '';
  loginRes.on('data', (chunk) => body += chunk);
  loginRes.on('end', () => {
    console.log('Login:', body);
    
    // Test endpoints ONE AT A TIME with sequential timing
    const endpoints = [
      '/api/users',
      '/api/employees',
      '/api/dashboard/admin-stats',
      '/api/orders',
      '/api/farmers',
      '/api/products',
      '/api/seeds',
    ];
    
    let idx = 0;
    function testOne() {
      if (idx >= endpoints.length) {
        console.log('\n=== DONE ===');
        return;
      }
      const ep = endpoints[idx++];
      const req = http.get(`http://localhost:8000${ep}`, { headers: { 'Cookie': cookieStr } }, (res) => {
        let d = '';
        res.on('data', c => d += c);
        res.on('end', () => {
          console.log(`${ep} => ${res.statusCode}: ${d.substring(0,120)}`);
          // Small delay before next test
          setTimeout(testOne, 100);
        });
      });
      req.on('error', e => {
        console.log(`${ep} => ERROR: ${e.message}`);
        setTimeout(testOne, 100);
      });
    }
    
    testOne();
  });
});
loginReq.on('error', e => console.error('Login error:', e.message));
loginReq.write(loginData);
loginReq.end();

