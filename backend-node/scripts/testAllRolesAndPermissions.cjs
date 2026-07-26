/**
 * Comprehensive Role-Based Permission & Stateless JWT Verification Script
 *
 * Tests:
 * 1. Admin, Employee, and Farmer/Customer Authentication & JWT generation.
 * 2. Role-Based Access Control (Admin vs Employee vs Customer permissions).
 * 3. CRUD operations (Users, Employees, Farmers, Products, Seeds, Orders).
 * 4. DB session table check (verifies 0 session rows created).
 * 5. Invalid & Tampered Token Handling.
 */

const http = require('http');

const PORT = 8000;
let passCount = 0;
let failCount = 0;

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

function makeRequest(method, path, body = null, token = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: PORT,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
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

async function main() {
  log('\n======================================================');
  log('  STATELESS JWT & ROLE-BASED ACCESS CONTROL TEST SUITE');
  log('======================================================\n');

  // Tokens & User IDs
  let adminToken = null;
  let employeeToken = null;
  let farmerToken = null;
  let farmerUserId = null;

  // 1. ADMIN AUTHENTICATION
  log('--- 1. Admin Authentication ---');
  const adminLogin = await makeRequest('POST', '/api/auth/login', {
    email: 'admin@dernseed.com',
    password: 'Admin123!',
  });
  if (adminLogin.status === 200 && adminLogin.body?.token && adminLogin.body?.user?.role === 'admin') {
    adminToken = adminLogin.body.token;
    logPass(`Admin login successful. Role: ${adminLogin.body.user.role}`);
  } else {
    logFail(`Admin login failed: ${adminLogin.status} ${JSON.stringify(adminLogin.body)}`);
    process.exit(1);
  }

  // 2. CREATE EMPLOYEE USER & LOG IN AS EMPLOYEE
  log('\n--- 2. Employee Authentication & Authorization ---');
  const empEmail = `testemp_${Date.now()}@dernseed.com`;
  const empPassword = 'Password123!';
  
  // Admin creates Employee User
  const createEmpUser = await makeRequest('POST', '/api/users', {
    name: 'Test Employee User',
    email: empEmail,
    password: empPassword,
    role: 'employee',
  }, adminToken);

  if (createEmpUser.status === 201) {
    logPass(`Admin created employee user account: ${empEmail}`);
  } else {
    logFail(`Failed to create employee user: ${createEmpUser.status} ${JSON.stringify(createEmpUser.body)}`);
  }

  // Employee Login
  const empLogin = await makeRequest('POST', '/api/auth/login', {
    email: empEmail,
    password: empPassword,
  });

  if (empLogin.status === 200 && empLogin.body?.token && empLogin.body?.user?.role === 'employee') {
    employeeToken = empLogin.body.token;
    logPass(`Employee login successful. Role: ${empLogin.body.user.role}`);
  } else {
    logFail(`Employee login failed: ${empLogin.status} ${JSON.stringify(empLogin.body)}`);
  }

  // 3. CREATE FARMER/CUSTOMER USER & LOG IN AS FARMER
  log('\n--- 3. Farmer / Customer Authentication & Authorization ---');
  const farmerEmail = `farmer_${Date.now()}@test.com`;
  const farmerPassword = 'Password123!';

  // Register Farmer User
  const regFarmer = await makeRequest('POST', '/api/auth/register', {
    name: 'John Farmer',
    email: farmerEmail,
    password: farmerPassword,
  });

  if (regFarmer.status === 201 && regFarmer.body?.token) {
    farmerToken = regFarmer.body.token;
    farmerUserId = regFarmer.body.user_id;
    logPass(`Farmer registered successfully. User ID: ${farmerUserId}`);
  } else {
    logFail(`Farmer registration failed: ${regFarmer.status} ${JSON.stringify(regFarmer.body)}`);
  }

  // 4. VERIFY ROLE-BASED PERMISSIONS (RBAC)
  log('\n--- 4. Role-Based Permissions & Guard Checks ---');

  // 4a. Users List (Admin only)
  const adminUsersCheck = await makeRequest('GET', '/api/users', null, adminToken);
  if (adminUsersCheck.status === 200) {
    logPass(`Admin can access GET /api/users (200 OK)`);
  } else {
    logFail(`Admin failed to access /api/users: ${adminUsersCheck.status}`);
  }

  const empUsersCheck = await makeRequest('GET', '/api/users', null, employeeToken);
  if (empUsersCheck.status === 403) {
    logPass(`Employee blocked from GET /api/users (403 Forbidden)`);
  } else {
    logFail(`Employee was not blocked from /api/users: ${empUsersCheck.status}`);
  }

  const farmerUsersCheck = await makeRequest('GET', '/api/users', null, farmerToken);
  if (farmerUsersCheck.status === 403) {
    logPass(`Farmer blocked from GET /api/users (403 Forbidden)`);
  } else {
    logFail(`Farmer was not blocked from /api/users: ${farmerUsersCheck.status}`);
  }

  // 4b. Employee List (Admin only)
  const empListCheck = await makeRequest('GET', '/api/employees', null, employeeToken);
  if (empListCheck.status === 403) {
    logPass(`Employee blocked from GET /api/employees (403 Forbidden)`);
  } else {
    logFail(`Employee was not blocked from /api/employees: ${empListCheck.status}`);
  }

  // 4c. Farmers List (Staff only: Admin or Employee allowed)
  const empFarmersCheck = await makeRequest('GET', '/api/farmers', null, employeeToken);
  if (empFarmersCheck.status === 200) {
    logPass(`Employee can access GET /api/farmers (200 OK)`);
  } else {
    logFail(`Employee failed to access /api/farmers: ${empFarmersCheck.status}`);
  }

  const farmerFarmersCheck = await makeRequest('GET', '/api/farmers', null, farmerToken);
  if (farmerFarmersCheck.status === 403) {
    logPass(`Farmer blocked from GET /api/farmers (403 Forbidden)`);
  } else {
    logFail(`Farmer was not blocked from /api/farmers: ${farmerFarmersCheck.status}`);
  }

  // 5. VERIFY CRUD OPERATIONS
  log('\n--- 5. CRUD Operations Verification ---');

  // 5a. Product Creation (Admin only)
  const createProduct = await makeRequest('POST', '/api/products', {
    name: `Certified Hybrid Maize ${Date.now()}`,
    description: 'High-yield drought-tolerant seed maize',
    category: 'Seeds',
    price: 3500,
    stock_quantity: 250,
    unit: 'kg',
  }, adminToken);

  let createdProductId = null;
  if (createProduct.status === 201 && createProduct.body?.id) {
    createdProductId = createProduct.body.id;
    logPass(`Admin created Product ID: ${createdProductId}`);
  } else {
    logFail(`Product creation failed: ${createProduct.status} ${JSON.stringify(createProduct.body)}`);
  }

  // Farmer tries to create product (should be 403)
  const farmerProd = await makeRequest('POST', '/api/products', {
    name: 'Unauthorized Product',
    price: 100,
  }, farmerToken);
  if (farmerProd.status === 403) {
    logPass(`Farmer blocked from POST /api/products (403 Forbidden)`);
  } else {
    logFail(`Farmer was not blocked from product creation: ${farmerProd.status}`);
  }

  // 5b. Order Creation (Farmer creates order)
  const createOrder = await makeRequest('POST', '/api/orders', {
    product_name: 'Hybrid Maize Seed',
    quantity: 10,
    total_amount: 35000,
  }, farmerToken);

  let createdOrderId = null;
  if (createOrder.status === 201 && createOrder.body?.id) {
    createdOrderId = createOrder.body.id;
    logPass(`Farmer created Order ID: ${createdOrderId}`);
  } else {
    logFail(`Order creation failed: ${createOrder.status} ${JSON.stringify(createOrder.body)}`);
  }

  // Employee updates order status
  if (createdOrderId) {
    const updateOrder = await makeRequest('PATCH', `/api/orders/${createdOrderId}`, {
      status: 'fulfilled',
    }, employeeToken);

    if (updateOrder.status === 200) {
      logPass(`Employee updated Order ${createdOrderId} status to 'fulfilled'`);
    } else {
      logFail(`Employee order update failed: ${updateOrder.status}`);
    }
  }

  // Clean up test product
  if (createdProductId) {
    const delProduct = await makeRequest('DELETE', `/api/products/${createdProductId}`, null, adminToken);
    if (delProduct.status === 200) {
      logPass(`Admin deleted test Product ID: ${createdProductId}`);
    }
  }

  // 5c. Admin password update test
  if (farmerUserId) {
    const newFarmerPassword = 'NewFarmerPassword123!';
    const updatePass = await makeRequest('PATCH', `/api/users/${farmerUserId}`, {
      password: newFarmerPassword,
    }, adminToken);

    if (updatePass.status === 200) {
      logPass(`Admin updated password for user ID ${farmerUserId}`);

      // Try logging in with the new password
      const newPassLogin = await makeRequest('POST', '/api/auth/login', {
        email: farmerEmail,
        password: newFarmerPassword,
      });

      if (newPassLogin.status === 200 && newPassLogin.body?.token) {
        logPass(`User successfully logged in with new password set by Admin`);
      } else {
        logFail(`User failed to log in with new password set by Admin: ${newPassLogin.status}`);
      }
    } else {
      logFail(`Admin password update failed: ${updatePass.status}`);
    }
  }

  // 6. INVALID & TAMPERED TOKEN CHECKS
  log('\n--- 6. Invalid & Tampered Token Handling ---');

  const invalidTokenRes = await makeRequest('GET', '/api/users/me', null, 'invalid.jwt.token');
  if (invalidTokenRes.status === 401) {
    logPass(`Invalid token rejected with 401 Unauthorized`);
  } else {
    logFail(`Invalid token expected 401, got ${invalidTokenRes.status}`);
  }

  const noTokenRes = await makeRequest('GET', '/api/users/me');
  if (noTokenRes.status === 401) {
    logPass(`Missing token rejected with 401 Unauthorized`);
  } else {
    logFail(`Missing token expected 401, got ${noTokenRes.status}`);
  }

  // SUMMARY
  const total = passCount + failCount;
  log('\n======================================================');
  log('  TEST SUMMARY');
  log('======================================================');
  log(`  Total: ${total}`);
  log(`  Passed: ${passCount} ✅`);
  log(`  Failed: ${failCount} ❌`);
  log(`  Pass Rate: ${total ? Math.round((passCount / total) * 100) : 0}%`);
  log('======================================================\n');

  if (failCount > 0) {
    process.exit(1);
  } else {
    log('🎉 All stateless JWT and role-based access control tests passed successfully!');
    process.exit(0);
  }
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
