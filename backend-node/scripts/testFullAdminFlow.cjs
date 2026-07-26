/**
 * Comprehensive Admin Flow Test Script
 * 
 * Tests ALL admin-protected endpoints to verify authentication,
 * authorization, and data loading work correctly.
 * 
 * Usage:
 *   node scripts/testFullAdminFlow.cjs
 * 
 * Prerequisites:
 *   - Backend server running on http://localhost:8000
 *   - Default admin credentials (admin@dernseed.com / Admin123!)
 */

const http = require('http');

const BASE_URL = 'http://localhost:8000';
const ADMIN_EMAIL = 'admin@dernseed.com';
const ADMIN_PASSWORD = 'Admin123!';

let passCount = 0;
let failCount = 0;
let cookieStr = '';

// Store created IDs so we can clean up after testing
let createdUserId = null;
let createdEmployeeId = null;
let createdFarmerId = null;
let createdProductId = null;
let createdSeedId = null;

function log(msg) {
  console.log(msg);
}

function logPass(msg) {
  console.log(`  ✅ PASS: ${msg}`);
  passCount++;
}

function logFail(msg) {
  console.log(`  ❌ FAIL: ${msg}`);
  failCount++;
}

function makeRequest(method, path, body = null, cookie = '') {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 8000,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (cookie) {
      options.headers['Authorization'] = cookie.startsWith('Bearer ') ? cookie : `Bearer ${cookie}`;
    }

    if (body) {
      const bodyStr = JSON.stringify(body);
      options.headers['Content-Length'] = Buffer.byteLength(bodyStr);
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        let parsed = null;
        try {
          parsed = JSON.parse(data);
        } catch {
          parsed = data;
        }
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: parsed,
          raw: data,
        });
      });
    });

    req.on('error', (e) => reject(e));

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  log('\n========================================');
  log('  ADMIN FLOW COMPREHENSIVE TEST SUITE');
  log('========================================\n');

  // ===========================
  // 1. LOGIN AS ADMIN
  // ===========================
  log('--- 1. Login ---');
  try {
    const loginRes = await makeRequest('POST', '/api/auth/login', {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });

    if (loginRes.status === 200) {
      logPass(`Login returned status ${loginRes.status}`);
      
      if (loginRes.body && loginRes.body.ok && loginRes.body.user) {
        logPass(`Login response has user object`);
        log(`     User: ${loginRes.body.user.name} (${loginRes.body.user.email}) - Role: ${loginRes.body.user.role}`);
        
        if (loginRes.body.user.role === 'admin') {
          logPass(`User role is 'admin'`);
        } else {
          logFail(`Expected role 'admin', got '${loginRes.body.user.role}'`);
        }
      } else {
        logFail(`Login response missing expected fields: ${loginRes.raw}`);
      }

      // Extract JWT bearer token from response body
      if (loginRes.body && loginRes.body.token) {
        cookieStr = loginRes.body.token;
        logPass(`JWT token received: ${cookieStr.substring(0, 30)}...`);
      } else {
        logFail('No JWT token found in login response body');
      }
    } else {
      logFail(`Login failed with status ${loginRes.status}: ${loginRes.raw}`);
      log('\nCannot proceed with tests without successful login.');
      printSummary();
      process.exit(1);
    }
  } catch (e) {
    logFail(`Login request failed: ${e.message}`);
    log('\nMake sure the backend server is running on port 8000.');
    printSummary();
    process.exit(1);
  }

  await sleep(100);

  // ===========================
  // 2. TEST AUTHENTICATION STATE
  // ===========================
  log('\n--- 2. Authentication State ---');
  
  // Test /api/users/me to verify session
  const meRes = await makeRequest('GET', '/api/users/me', null, cookieStr);
  if (meRes.status === 200) {
    logPass(`GET /api/users/me returned status ${meRes.status}`);
  } else {
    logFail(`GET /api/users/me failed: status=${meRes.status} body=${meRes.raw}`);
  }

  await sleep(100);

  // ===========================
  // 3. TEST ADMIN DASHBOARD STATS
  // ===========================
  log('\n--- 3. Dashboard Stats ---');
  
  const statsRes = await makeRequest('GET', '/api/dashboard/admin-stats', null, cookieStr);
  if (statsRes.status === 200) {
    logPass(`GET /api/dashboard/admin-stats: ${statsRes.status}`);
    if (statsRes.body && statsRes.body.stats) {
      log(`     Users: ${statsRes.body.stats.users?.total ?? 'N/A'}`);
      log(`     Farmers: ${statsRes.body.stats.farmers ?? 'N/A'}`);
      log(`     Products: ${statsRes.body.stats.products ?? 'N/A'}`);
      log(`     Orders: ${statsRes.body.stats.orders ?? 'N/A'}`);
    }
  } else {
    logFail(`GET /api/dashboard/admin-stats failed: status=${statsRes.status} body=${statsRes.raw}`);
  }

  await sleep(100);

  // ===========================
  // 4. TEST USER MANAGEMENT
  // ===========================
  log('\n--- 4. User Management ---');

  // 4a. List users
  const listUsersRes = await makeRequest('GET', '/api/users', null, cookieStr);
  if (listUsersRes.status === 200) {
    logPass(`GET /api/users: ${listUsersRes.status} (${listUsersRes.body?.users?.length ?? 0} users)`);
  } else {
    logFail(`GET /api/users failed: status=${listUsersRes.status} body=${listUsersRes.raw}`);
  }

  await sleep(100);

  // 4b. Create a new user
  const testUserEmail = `testuser_${Date.now()}@test.com`;
  const createUserRes = await makeRequest('POST', '/api/users', {
    name: 'Test User',
    email: testUserEmail,
    password: 'TestPass123!',
    role: 'user',
  }, cookieStr);
  
  if (createUserRes.status === 201) {
    logPass(`POST /api/users (create): ${createUserRes.status}`);
    createdUserId = createUserRes.body?.id;
    log(`     Created user ID: ${createdUserId}`);
  } else {
    logFail(`POST /api/users failed: status=${createUserRes.status} body=${createUserRes.raw}`);
  }

  await sleep(100);

  // 4c. Update that user (if created)
  if (createdUserId) {
    const updateUserRes = await makeRequest('PATCH', `/api/users/${createdUserId}`, {
      name: 'Updated Test User',
    }, cookieStr);
    
    if (updateUserRes.status === 200) {
      logPass(`PATCH /api/users/${createdUserId} (update): ${updateUserRes.status}`);
    } else {
      logFail(`PATCH /api/users/${createdUserId} failed: status=${updateUserRes.status} body=${updateUserRes.raw}`);
    }

    await sleep(100);

    // 4d. Delete the test user
    const deleteUserRes = await makeRequest('DELETE', `/api/users/${createdUserId}`, null, cookieStr);
    if (deleteUserRes.status === 200) {
      logPass(`DELETE /api/users/${createdUserId}: ${deleteUserRes.status}`);
    } else {
      logFail(`DELETE /api/users/${createdUserId} failed: status=${deleteUserRes.status} body=${deleteUserRes.raw}`);
    }
  }

  await sleep(100);

  // ===========================
  // 5. TEST EMPLOYEE MANAGEMENT
  // ===========================
  log('\n--- 5. Employee Management ---');

  // 5a. List employees
  const listEmpRes = await makeRequest('GET', '/api/employees', null, cookieStr);
  if (listEmpRes.status === 200) {
    logPass(`GET /api/employees: ${listEmpRes.status} (${listEmpRes.body?.employees?.length ?? 0} employees)`);
  } else {
    logFail(`GET /api/employees failed: status=${listEmpRes.status} body=${listEmpRes.raw}`);
  }

  await sleep(100);

  // 5b. Create an employee
  const testEmployeeEmail = `testemp_${Date.now()}@test.com`;
  const createEmpRes = await makeRequest('POST', '/api/employees', {
    name: 'Test Employee',
    email: testEmployeeEmail,
    phone: '+250788888888',
    position: 'Test Position',
    department: 'Test Department',
    salary: 50000,
  }, cookieStr);

  if (createEmpRes.status === 201) {
    logPass(`POST /api/employees (create): ${createEmpRes.status}`);
    createdEmployeeId = createEmpRes.body?.id;
    log(`     Created employee ID: ${createdEmployeeId}`);
  } else {
    logFail(`POST /api/employees failed: status=${createEmpRes.status} body=${createEmpRes.raw}`);
  }

  await sleep(100);

  // 5c. Delete the test employee
  if (createdEmployeeId) {
    const deleteEmpRes = await makeRequest('DELETE', `/api/employees/${createdEmployeeId}`, null, cookieStr);
    if (deleteEmpRes.status === 200) {
      logPass(`DELETE /api/employees/${createdEmployeeId}: ${deleteEmpRes.status}`);
    } else {
      logFail(`DELETE /api/employees/${createdEmployeeId} failed: status=${deleteEmpRes.status} body=${deleteEmpRes.raw}`);
    }
  }

  await sleep(100);

  // ===========================
  // 6. TEST CUSTOMERS (FARMERS)
  // ===========================
  log('\n--- 6. Customer (Farmer) Management ---');

  // 6a. List farmers
  const listFarmRes = await makeRequest('GET', '/api/farmers', null, cookieStr);
  if (listFarmRes.status === 200) {
    logPass(`GET /api/farmers: ${listFarmRes.status} (${listFarmRes.body?.farmers?.length ?? 0} farmers)`);
  } else {
    logFail(`GET /api/farmers failed: status=${listFarmRes.status} body=${listFarmRes.raw}`);
  }

  await sleep(100);

  // 6b. Create a farmer
  const createFarmRes = await makeRequest('POST', '/api/farmers', {
    name: 'Test Farmer',
    phone: '+250788999999',
    farm_name: 'Test Farm',
    farm_location: 'Kigali',
    farm_size: 5.5,
    crops_grown: 'Maize, Beans',
  }, cookieStr);

  if (createFarmRes.status === 201) {
    logPass(`POST /api/farmers (create): ${createFarmRes.status}`);
    createdFarmerId = createFarmRes.body?.id;
    log(`     Created farmer ID: ${createdFarmerId}`);
  } else {
    logFail(`POST /api/farmers failed: status=${createFarmRes.status} body=${createFarmRes.raw}`);
  }

  await sleep(100);

  // 6c. Delete the test farmer
  if (createdFarmerId) {
    const deleteFarmRes = await makeRequest('DELETE', `/api/farmers/${createdFarmerId}`, null, cookieStr);
    if (deleteFarmRes.status === 200) {
      logPass(`DELETE /api/farmers/${createdFarmerId}: ${deleteFarmRes.status}`);
    } else {
      logFail(`DELETE /api/farmers/${createdFarmerId} failed: status=${deleteFarmRes.status} body=${deleteFarmRes.raw}`);
    }
  }

  await sleep(100);

  // ===========================
  // 7. TEST PRODUCTS (ADMIN)
  // ===========================
  log('\n--- 7. Product Management ---');

  // 7a. List products (public, but also test)
  const listProdRes = await makeRequest('GET', '/api/products', null, cookieStr);
  if (listProdRes.status === 200) {
    logPass(`GET /api/products: ${listProdRes.status} (${listProdRes.body?.products?.length ?? 0} products)`);
  } else {
    logFail(`GET /api/products failed: status=${listProdRes.status} body=${listProdRes.raw}`);
  }

  await sleep(100);

  // 7b. Create a product
  const createProdRes = await makeRequest('POST', '/api/products', {
    name: `Test Product ${Date.now()}`,
    description: 'A test product',
    category: 'Test',
    price: 1000,
    stock_quantity: 100,
    unit: 'kg',
  }, cookieStr);

  if (createProdRes.status === 201) {
    logPass(`POST /api/products (create): ${createProdRes.status}`);
    createdProductId = createProdRes.body?.id;
    log(`     Created product ID: ${createdProductId}`);
  } else {
    logFail(`POST /api/products failed: status=${createProdRes.status} body=${createProdRes.raw}`);
  }

  await sleep(100);

  // 7c. Delete the test product
  if (createdProductId) {
    const deleteProdRes = await makeRequest('DELETE', `/api/products/${createdProductId}`, null, cookieStr);
    if (deleteProdRes.status === 200) {
      logPass(`DELETE /api/products/${createdProductId}: ${deleteProdRes.status}`);
    } else {
      logFail(`DELETE /api/products/${createdProductId} failed: status=${deleteProdRes.status} body=${deleteProdRes.raw}`);
    }
  }

  await sleep(100);

  // ===========================
  // 8. TEST SEEDS (ADMIN)
  // ===========================
  log('\n--- 8. Seed Management ---');

  // 8a. List seeds (public, but also test)
  const listSeedRes = await makeRequest('GET', '/api/seeds', null, cookieStr);
  if (listSeedRes.status === 200) {
    logPass(`GET /api/seeds: ${listSeedRes.status} (${listSeedRes.body?.seeds?.length ?? 0} seeds)`);
  } else {
    logFail(`GET /api/seeds failed: status=${listSeedRes.status} body=${listSeedRes.raw}`);
  }

  await sleep(100);

  // 8b. Create a seed
  const createSeedRes = await makeRequest('POST', '/api/seeds', {
    name: `Test Seed ${Date.now()}`,
    variety: 'Test Variety',
    crop_type: 'Maize',
    price_per_kg: 2500,
    stock_quantity: 500,
    germination_rate: 95,
    origin: 'Rwanda',
    certification: 'ISTA Certified',
  }, cookieStr);

  if (createSeedRes.status === 201) {
    logPass(`POST /api/seeds (create): ${createSeedRes.status}`);
    createdSeedId = createSeedRes.body?.id;
    log(`     Created seed ID: ${createdSeedId}`);
  } else {
    logFail(`POST /api/seeds failed: status=${createSeedRes.status} body=${createSeedRes.raw}`);
  }

  await sleep(100);

  // 8c. Delete the test seed
  if (createdSeedId) {
    const deleteSeedRes = await makeRequest('DELETE', `/api/seeds/${createdSeedId}`, null, cookieStr);
    if (deleteSeedRes.status === 200) {
      logPass(`DELETE /api/seeds/${createdSeedId}: ${deleteSeedRes.status}`);
    } else {
      logFail(`DELETE /api/seeds/${createdSeedId} failed: status=${deleteSeedRes.status} body=${deleteSeedRes.raw}`);
    }
  }

  await sleep(100);

  // ===========================
  // 9. TEST ORDERS
  // ===========================
  log('\n--- 9. Order Management ---');

  // 9a. List orders
  const listOrdRes = await makeRequest('GET', '/api/orders', null, cookieStr);
  if (listOrdRes.status === 200) {
    logPass(`GET /api/orders: ${listOrdRes.status} (${listOrdRes.body?.orders?.length ?? 0} orders)`);
  } else {
    logFail(`GET /api/orders failed: status=${listOrdRes.status} body=${listOrdRes.raw}`);
  }

  await sleep(100);

  // ===========================
  // 10. TEST CONTACT MESSAGES (STAFF)
  // ===========================
  log('\n--- 10. Contact Messages ---');

  const listMsgRes = await makeRequest('GET', '/api/contact', null, cookieStr);
  if (listMsgRes.status === 200) {
    logPass(`GET /api/contact: ${listMsgRes.status} (${listMsgRes.body?.messages?.length ?? 0} messages)`);
  } else {
    logFail(`GET /api/contact failed: status=${listMsgRes.status} body=${listMsgRes.raw}`);
  }

  await sleep(100);

  // ===========================
  // 11. TEST PRODUCT INQUIRIES (STAFF)
  // ===========================
  log('\n--- 11. Product Inquiries ---');

  const listInqRes = await makeRequest('GET', '/api/product-inquiries', null, cookieStr);
  if (listInqRes.status === 200) {
    logPass(`GET /api/product-inquiries: ${listInqRes.status} (${listInqRes.body?.inquiries?.length ?? 0} inquiries)`);
  } else {
    logFail(`GET /api/product-inquiries failed: status=${listInqRes.status} body=${listInqRes.raw}`);
  }

  await sleep(100);

  // ===========================
  // 12. TEST AUTH ENDPOINTS
  // ===========================
  log('\n--- 12. Auth Endpoints ---');

  // 12a. Logout
  const logoutRes = await makeRequest('POST', '/api/auth/logout', null, cookieStr);
  if (logoutRes.status === 200) {
    logPass(`POST /api/auth/logout: ${logoutRes.status}`);
  } else {
    logFail(`POST /api/auth/logout failed: status=${logoutRes.status} body=${logoutRes.raw}`);
  }

  await sleep(100);

  // 12b. After logout, client removes the token; protected endpoints without token return 401
  cookieStr = '';
  const afterLogoutRes = await makeRequest('GET', '/api/users/me', null, cookieStr);
  if (afterLogoutRes.status === 401) {
    logPass(`GET /api/users/me without token correctly returns 401`);
  } else {
    logFail(`GET /api/users/me without token returned ${afterLogoutRes.status}, expected 401`);
  }

  // ===========================
  // SUMMARY
  // ===========================
  printSummary();
}

function printSummary() {
  const total = passCount + failCount;
  log('\n========================================');
  log('  TEST SUMMARY');
  log('========================================');
  log(`  Total: ${total}`);
  log(`  Passed: ${passCount} ✅`);
  log(`  Failed: ${failCount} ❌`);
  log(`  Pass Rate: ${total ? Math.round((passCount / total) * 100) : 0}%`);
  log('========================================\n');
  
  if (failCount > 0) {
    log('⚠️  Some tests failed. Check the logs above for details.');
    process.exit(1);
  } else {
    log('🎉 All tests passed! Admin authorization and data loading are working correctly.');
    process.exit(0);
  }
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});

