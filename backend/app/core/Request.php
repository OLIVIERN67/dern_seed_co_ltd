<?php
declare(strict_types=1);

namespace App\Core;

final class Request
{
    public function __construct(
        public readonly string $method,
        public readonly string $path,
        public readonly array $query,
        public readonly array $headers,
        public readonly array $cookies,
        public readonly mixed $body,
    ) {}

    public static function fromGlobals(): self
    {
        $method = strtoupper((string)($_SERVER['REQUEST_METHOD'] ?? 'GET'));
        $uri = (string)($_SERVER['REQUEST_URI'] ?? '/');

        $path = parse_url($uri, PHP_URL_PATH) ?: '/';

        $headers = function_exists('getallheaders') ? getallheaders() : [];
        if (!is_array($headers)) $headers = [];

        $cookies = is_array($_COOKIE ?? null) ? $_COOKIE : [];
        $query = is_array($_GET ?? null) ? $_GET : [];

        $contentType = strtolower((string)($_SERVER['CONTENT_TYPE'] ?? ''));
        $raw = file_get_contents('php://input') ?: '';

        $body = null;
        if ($raw !== '' && str_contains($contentType, 'application/json')) {
            $decoded = json_decode($raw, true);
            $body = is_array($decoded) ? $decoded : null;
        }

        return new self($method, $path, $query, $headers, $cookies, $body);
    }
}

