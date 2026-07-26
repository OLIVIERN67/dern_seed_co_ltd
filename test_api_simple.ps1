$ErrorActionPreference = "Continue"

Write-Host "Testing API Endpoints..." -ForegroundColor Green

Write-Host "`n1. Testing Health Endpoint..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000/api/health" -UseBasicParsing
    Write-Host "SUCCESS: Health endpoint returned $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response: $($response.Content)" -ForegroundColor Gray
} catch {
    Write-Host "FAILED: Health endpoint - $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n2. Testing Testimonials Endpoint..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000/api/testimonials" -UseBasicParsing
    Write-Host "SUCCESS: Testimonials endpoint returned $($response.StatusCode)" -ForegroundColor Green
    $data = $response.Content | ConvertFrom-Json
    Write-Host "Found $($data.testimonials.Count) testimonials" -ForegroundColor Gray
} catch {
    Write-Host "FAILED: Testimonials endpoint - $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n3. Testing Products Endpoint..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000/api/products" -UseBasicParsing
    Write-Host "SUCCESS: Products endpoint returned $($response.StatusCode)" -ForegroundColor Green
    $data = $response.Content | ConvertFrom-Json
    Write-Host "Found $($data.products.Count) products" -ForegroundColor Gray
} catch {
    Write-Host "FAILED: Products endpoint - $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n4. Testing Seeds Endpoint..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000/api/seeds" -UseBasicParsing
    Write-Host "SUCCESS: Seeds endpoint returned $($response.StatusCode)" -ForegroundColor Green
    $data = $response.Content | ConvertFrom-Json
    Write-Host "Found $($data.seeds.Count) seeds" -ForegroundColor Gray
} catch {
    Write-Host "FAILED: Seeds endpoint - $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n5. Testing Login Endpoint..." -ForegroundColor Yellow
try {
    $body = @{email = "admin@dernseed.com"; password = "Admin123!"} | ConvertTo-Json
    $response = Invoke-WebRequest -Uri "http://localhost:8000/api/auth/login" -Method POST -Body $body -ContentType "application/json" -UseBasicParsing
    Write-Host "SUCCESS: Login endpoint returned $($response.StatusCode)" -ForegroundColor Green
    $data = $response.Content | ConvertFrom-Json
    Write-Host "User: $($data.user.name) ($($data.user.email))" -ForegroundColor Gray
    Write-Host "Role: $($data.user.role)" -ForegroundColor Gray
    $token = $data.token
    Write-Host "Token: $($token.Substring(0, 20))..." -ForegroundColor Gray
} catch {
    Write-Host "FAILED: Login endpoint - $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        Write-Host "Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
    }
}

if ($token) {
    Write-Host "`n6. Testing Protected Endpoint (Users Me)..." -ForegroundColor Yellow
    try {
        $headers = @{Authorization = "Bearer $token"}
        $response = Invoke-WebRequest -Uri "http://localhost:8000/api/users/me" -Headers $headers -UseBasicParsing
        Write-Host "SUCCESS: Users/me endpoint returned $($response.StatusCode)" -ForegroundColor Green
        $data = $response.Content | ConvertFrom-Json
        Write-Host "User: $($data.user.name) ($($data.user.email))" -ForegroundColor Gray
    } catch {
        Write-Host "FAILED: Users/me endpoint - $($_.Exception.Message)" -ForegroundColor Red
        if ($_.Exception.Response) {
            Write-Host "Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
        }
    }

    Write-Host "`n7. Testing Admin Stats Endpoint..." -ForegroundColor Yellow
    try {
        $headers = @{Authorization = "Bearer $token"}
        $response = Invoke-WebRequest -Uri "http://localhost:8000/api/dashboard/admin-stats" -Headers $headers -UseBasicParsing
        Write-Host "SUCCESS: Admin stats endpoint returned $($response.StatusCode)" -ForegroundColor Green
        $data = $response.Content | ConvertFrom-Json
        Write-Host "Total users: $($data.stats.users.total)" -ForegroundColor Gray
        Write-Host "Admins: $($data.stats.users.admins)" -ForegroundColor Gray
        Write-Host "Products: $($data.stats.products)" -ForegroundColor Gray
        Write-Host "Seeds: $($data.stats.seeds)" -ForegroundColor Gray
    } catch {
        Write-Host "FAILED: Admin stats endpoint - $($_.Exception.Message)" -ForegroundColor Red
        if ($_.Exception.Response) {
            Write-Host "Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
        }
    }

    Write-Host "`n8. Testing Users List Endpoint..." -ForegroundColor Yellow
    try {
        $headers = @{Authorization = "Bearer $token"}
        $response = Invoke-WebRequest -Uri "http://localhost:8000/api/users" -Headers $headers -UseBasicParsing
        Write-Host "SUCCESS: Users list endpoint returned $($response.StatusCode)" -ForegroundColor Green
        $data = $response.Content | ConvertFrom-Json
        Write-Host "Found $($data.users.Count) users" -ForegroundColor Gray
    } catch {
        Write-Host "FAILED: Users list endpoint - $($_.Exception.Message)" -ForegroundColor Red
        if ($_.Exception.Response) {
            Write-Host "Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
        }
    }
}

Write-Host "`n=== API Test Complete ===" -ForegroundColor Green
