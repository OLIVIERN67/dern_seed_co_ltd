<?php
declare(strict_types=1);

// Simple PSR-4-ish autoloader for App\* namespace
spl_autoload_register(function (string $class) {
    if (!str_starts_with($class, 'App\\')) {
        return;
    }
    $path = __DIR__ . '/' . str_replace('App\\', '', $class) . '.php';
    $path = str_replace('\\', '/', $path);
    if (is_file($path)) {
        require_once $path;
    }
});

// Load .env (very small implementation: only KEY=VALUE)
$envPath = __DIR__ . '/../.env';
if (is_file($envPath)) {
    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#')) continue;
        $parts = explode('=', $line, 2);
        if (count($parts) !== 2) continue;
        $_ENV[trim($parts[0])] = trim($parts[1]);
    }
}

