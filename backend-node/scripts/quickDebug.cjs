const http = require('http');
const fs = require('fs');
const outputFile = 'c:/Users/CRAT-NDIHO/Downloads/dern_seed_co_ltd/backend-node/debugQuickOutput.txt';

function log(msg) {
  console.log(msg);
  fs.appendFileSync(outputFile, msg + '\n');
}

fs.writeFileSync(outputFile, '=== Quick Debug ===\n');

const loginData = JSON.stringify({email:'admin@dernseed.com',password:'Admin123!'});

const loginReq = http.request({
  hostname:'localhost',
  port:8000,
  path:'/api/auth/login',
  method:'POST',
  headers:{'Content-Type':'application/json','Content-Length':Buffer.byteLength(loginData)}
}, (res) => {
  let body='';
  res.on('data',c=>body+=c);
  res.on('end',()=>{
    log('Login status: ' + res.statusCode);
    const setCookie = res.headers['set-cookie'];
    log('Set-Cookie: ' + JSON.stringify(setCookie));
    const cookie = (Array.isArray(setCookie) ? setCookie.find(c=>c.startsWith('dern_session=')) : setCookie || '').split(';')[0];
    log('Extracted cookie: ' + cookie.substring(0,60) + '...');
    
    // Test 1: /api/users/me (requireAuth only)
    http.get('http://localhost:8000/api/users/me', {headers:{'Cookie':cookie}}, (r2)=>{
      let b2='';
      r2.on('data',c=>b2+=c);
      r2.on('end',()=>{
        log('/api/users/me => status=' + r2.statusCode + ' body=' + b2.substring(0,200));
        
        // Test 2: /api/users (requireAdmin)
        http.get('http://localhost:8000/api/users', {headers:{'Cookie':cookie}}, (r3)=>{
          let b3='';
          r3.on('data',c=>b3+=c);
          r3.on('end',()=>{
            log('/api/users (admin) => status=' + r3.statusCode + ' body=' + b3.substring(0,200));
            
            // Test 3: /api/dashboard/admin-stats (requireAdmin)
            http.get('http://localhost:8000/api/dashboard/admin-stats', {headers:{'Cookie':cookie}}, (r4)=>{
              let b4='';
              r4.on('data',c=>b4+=c);
              r4.on('end',()=>{
                log('/api/dashboard/admin-stats => status=' + r4.statusCode + ' body=' + b4.substring(0,200));
                log('=== DEBUG DONE ===');
              });
            });
          });
        });
      });
    });
  });
});
loginReq.write(loginData);
loginReq.end();

