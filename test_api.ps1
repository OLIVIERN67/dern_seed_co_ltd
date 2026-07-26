# API Test Script
$ErrorActionPreference = "Stop"

Write-Host "Testing API Endpoints..." -ForegroundColor Green

# Test Health Endpoint
Write-Host "`n1. Testing Health Endpoint..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000/api/health" -UseBasicParsing
    Write-Host "✓ Health endpoint: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "  Response: $($response.Content)" -ForegroundColor Gray
} catch {
    Write-Host "✗ Health endpoint failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test Public Testimonials Endpoint
Write-Host "`n2. Testing Public Testimonials Endpoint..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000/api/testimonials" -UseBasicParsing
    Write-Host "✓ Testimonials endpoint: $($response.StatusCode)" -ForegroundColor Green
    $data = $response.Content | ConvertFrom-Json
    Write-Host "  Found $($data.testimonials.Count) testimonials" -ForegroundColor Gray
} catch {
    Write-Host "✗ Testimonials endpoint failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test Public Products Endpoint
Write-Host "`n3. Testing Public Products Endpoint..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000/api/products" -UseBasicParsing
    Write-Host "✓ Products endpoint: $($response.StatusCode)" -ForegroundColor Green
    $data = $response.Content | ConvertFrom-Json
    Write-Host "  Found $($data.products.Count) products" -ForegroundColor Gray
} catch {
    Write-Host "✗ Products endpoint failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test Public Seeds Endpoint
Write-Host "`n4. Testing Public Seeds Endpoint..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000/api/seeds" -UseBasicParsing
    Write-Host "✓ Seeds endpoint: $($response.StatusCode)" -ForegroundColor Green
    $data = $response.Content | ConvertFrom-Json
    Write-Host "  Found $($data.seeds.Count) seeds" -ForegroundColor Gray
} catch {
    Write-Host "✗ Seeds endpoint failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test Login Endpoint
Write-Host "`n5. Testing Login Endpoint..." -ForegroundColor Yellow
try {
    $body = @{
        email = "admin@dernseed.com"
        password = "Admin123!"
    } | ConvertTo-Json
    $response = Invoke-WebRequest -Uri "http://localhost:8000/api/auth/login" -Method POST -Body $body -ContentType "application/json" -UseBasicParsing
    Write-Host "✓ Login endpoint: $($response.StatusCode)" -ForegroundColor Green
    $data = $response.Content | ConvertFrom-Json
    Write-Host "  User: $($data.user.name) ($($data.user.email))" -ForegroundColor Gray
    Write-Host "  Role: $($data.user.role)" -ForegroundColor Gray
    Write-Host "  Token: $($data.token.Substring(0, 20))..." -ForegroundColor Gray
    $global:token = $data.token
} catch {
    Write-Host "✗ Login endpoint failed: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        Write-Host "  Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $errorBody = $reader.ReadToEnd()
        Write-Host "  Error: $errorBody" -ForegroundColor Red
    }
}

# Test Protected Endpoint with Token
if ($global:token) {
    Write-Host "`n6. Testing Protected Endpoint (Users Me)..." -ForegroundColor Yellow
    try {
        $headers = @{
            Authorization = "Bearer $global:token"
        }
        $response = Invoke-WebRequest -Uri "http://localhost:8000/api/users/me" -Headers $headers -UseBasicParsing
        Write-Host "✓ Users/me endpoint: $($response.StatusCode)" -ForegroundColor Green
        $data = $response.Content | ConvertFrom-Json
        Write-Host "  User: $($data.user.name) ($($data.user.email))" -ForegroundColor Gray
    } catch {
        Write-Host "✗ Users/me endpoint failed: $($_.Exception.Message)" -ForegroundColor Red
        if ($_.Exception.Response) {
            Write-Host "  Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
        }
    }

    # Test Admin Stats Endpoint
    Write-Host "`n7. Testing Admin Stats Endpoint..." -ForegroundColor Yellow
    try {
        $headers = @{
            Authorization = "Bearer $global:token"
        }
        $response = Invoke-WebRequest -Uri "http://localhost:8000/api/dashboard/admin-stats" -Headers $headers -UseBasicParsing
        Write-Host "✓ Admin stats endpoint: $($response.StatusCode)" -ForegroundColor Green
        $data = $response.Content | ConvertFrom-Json
        Write-Host "  Total users: $($data.stats.users.total)" -ForegroundColor Gray
        Write-Host "  Admins: $($data.stats.users.admins)" -ForegroundColor Gray
        Write-Host "  Products: $($data.stats.products)" -ForegroundColor Gray
        Write-Host "  Seeds: $($data.stats.seeds)" -ForegroundColor Gray
    } catch {
        Write-Host "✗ Admin stats endpoint failed: $($_.Exception.Message)" -ForegroundColor Red
        if ($_.Exception.Response) {
            Write-Host "  Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
        }
    }

    # Test Users List Endpoint (Admin only)
    Write-Host "`n8. Testing Users List Endpoint (Admin only)..." -ForegroundColor Yellow
    try {
        $headers = @{
            Authorization = "Bearer $global:token"
        }
        $response = Invoke-WebRequest -Uri "http://localhost:8000/api/users" -Headers $headers -UseBasicParsing
        Write-Host "✓ Users list endpoint: $($response.StatusCode)" -ForegroundColor Green
        $data = $response.Content | ConvertFrom-Json
        Write-Host "  Found $($data.users.Count) users" -ForegroundColor Gray
    } catch {
        Write-Host "✗ Users list endpoint failed: $($_.Exception.Message)" -ForegroundColor Red
        if ($_.Exception.Response) {
            Write-Host "  Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
        }
    }
}

Write-Host "`n=== API Test Complete ===" -ForegroundColor Green
