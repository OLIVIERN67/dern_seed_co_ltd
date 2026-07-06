<?php
declare(strict_types=1);

namespace App\Config;

use PDO;

final class Database
{
    public static function pdo(): PDO
    {
        static $pdo = null;
        if ($pdo instanceof PDO) {
            return $pdo;
        }

        $host = Config::requireEnv('DB_HOST');
        $port = (string)Config::env('DB_PORT', '3306');
        $db = Config::requireEnv('DB_NAME');
        $user = Config::requireEnv('DB_USER');
        $pass = (string)Config::env('DB_PASS', '');
        $charset = (string)Config::env('DB_CHARSET', 'utf8mb4');

        $dsn = "mysql:host={$host};port={$port};dbname={$db};charset={$charset}";

        $pdo = new PDO($dsn, $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);

        return $pdo;
    }
}

