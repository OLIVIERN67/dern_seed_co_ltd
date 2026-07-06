<?php
declare(strict_types=1);

namespace App\Core;

final class Response
{
    public function json(array $data, int $status = 200): void
    {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    }

    public function setCookie(string $name, string $value, int $expiresAt, bool $secure, bool $httpOnly, string $path = '/'): void
    {
        $options = [
            'expires' => $expiresAt > 0 ? gmdate('D, d M Y H:i:s \G\M\T', $expiresAt) : 0,
            'path' => $path,
            'secure' => $secure,
            'httponly' => $httpOnly,
            'samesite' => 'Lax',
        ];

        // PHP expects cookies in a specific format
        setcookie($name, $value, $options['expires'], $options['path'], '', $secure, $httpOnly);
    }
}

