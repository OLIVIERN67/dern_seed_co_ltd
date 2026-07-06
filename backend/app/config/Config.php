<?php
declare(strict_types=1);

namespace App\Config;

final class Config
{
    public static function env(string $key, mixed $default = null): mixed
    {
        return array_key_exists($key, $_ENV) ? $_ENV[$key] : $default;
    }

    public static function requireEnv(string $key): string
    {
        $val = self::env($key);
        if (!is_string($val) || $val === '') {
            throw new \RuntimeException("Missing required env var: {$key}");
        }
        return $val;
    }
}

