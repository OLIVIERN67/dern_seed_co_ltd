// Test admin-protected endpoints after login
const http = require('http');

const loginData = JSON.stringify({
  email: 'admin@dernseed.com',
  password: 'Admin123!'
});

// First, login and capture cookies
const loginReq = http.request({
  hostname: 'localhost',
  port: 8000,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(loginData)
  }
}, (loginRes) => {
  let setCookie = loginRes.headers['set-cookie'];
  console.log('Login status:', loginRes.statusCode);
  console.log('Set-Cookie:', setCookie ? setCookie.join('; ') : 'NONE');
  
  let body = '';
  loginRes.on('data', (chunk) => body += chunk);
  loginRes.on('end', () => {
    console.log('Login body:', body);
    
    if (!setCookie) {
      console.log('\nNO COOKIE RECEIVED - cannot proceed');
      return;
    }
    
    // Extract session cookie value
    const sessionCookie = Array.isArray(setCookie) 
      ? setCookie.find(c => c.startsWith('dern_session='))
      : setCookie;
    
    if (!sessionCookie) {
      console.log('\nNo dern_session cookie found');
      return;
    }
    
    // Get just the cookie name=value part (before any ;)
    const cookieValue = sessionCookie.split(';')[0];
    console.log('\nUsing cookie:', cookieValue);
    
    // Now test protected endpoints
    const endpoints = [
      { name: 'GET /api/users', method: 'GET', path: '/api/users' },
      { name: 'GET /api/employees', method: 'GET', path: '/api/employees' },
      { name: 'GET /api/dashboard/admin-stats', method: 'GET', path: '/api/dashboard/admin-stats' },
      { name: 'GET /api/farmers', method: 'GET', path: '/api/farmers' },
      { name: 'GET /api/orders', method: 'GET', path: '/api/orders' },
      { name: 'GET /api/products', method: 'GET', path: '/api/products' },
      { name: 'GET /api/seeds', method: 'GET', path: '/api/seeds' },
    ];
    
    let idx = 0;
    function testNext() {
      if (idx >= endpoints.length) {
        console.log('\n=== ALL ENDPOINTS TESTED ===');
        return;
      }
      
      const ep = endpoints[idx++];
      const req = http.request({
        hostname: 'localhost',
        port: 8000,
        path: ep.path,
        method: ep.method,
        headers: {
          'Cookie': cookieValue
        }
      }, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          console.log(`\n[${ep.name}]`);
          console.log(`  Status: ${res.statusCode}`);
          console.log(`  Body: ${data.substring(0, 200)}`);
          testNext();
        });
      });
      req.on('error', (e) => {
        console.log(`\n[${ep.name}] ERROR: ${e.message}`);
        testNext();
      });
      req.end();
    }
    
    testNext();
  });
});

loginReq.on('error', (error) => {
  console.error('Login error:', error.message);
});

loginReq.write(loginData);
loginReq.end();

