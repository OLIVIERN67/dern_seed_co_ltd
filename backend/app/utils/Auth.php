<?php
declare(strict_types=1);

namespace App\Utils;

use App\Config\Config;
use App\Config\Database;
use PDO;

final class Auth
{
    public static function sessionCookieName(): string
    {
        return (string)Config::env('SESSION_COOKIE_NAME', 'dern_session');
    }

    public static function sessionTTL(): int
    {
        return (int)Config::env('SESSION_TTL', 2592000);
    }

    public static function sessionCookieSecure(): bool
    {
        return filter_var((string)Config::env('SESSION_COOKIE_SECURE', 'false'), FILTER_VALIDATE_BOOLEAN);
    }

    public static function createSession(int $userId): array
    {
        $pdo = Database::pdo();
        $token = hash('sha256', bin2hex(random_bytes(32))); // 64 chars
        $expiresAt = (new \DateTimeImmutable())->modify('+' . self::sessionTTL() . ' seconds');

        $stmt = $pdo->prepare('INSERT INTO sessions (user_id, session_token, expires_at) VALUES (:uid, :tok, :exp)');
        $stmt->execute([
            ':uid' => $userId,
            ':tok' => $token,
            ':exp' => $expiresAt->format('Y-m-d H:i:s'),
        ]);

        return [
            'token' => $token,
            'expiresAtTs' => $expiresAt->getTimestamp(),
        ];
    }

    public static function getUserIdFromSessionToken(string $token): ?int
    {
        $pdo = Database::pdo();

        $stmt = $pdo->prepare('SELECT user_id, expires_at, revoked_at FROM sessions WHERE session_token = :tok LIMIT 1');
        $stmt->execute([':tok' => $token]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$row) {
            return null;
        }

        if (!empty($row['revoked_at'])) {
            return null;
        }

        $expires = new \DateTimeImmutable((string)$row['expires_at']);
        if ($expires < new \DateTimeImmutable()) {
            return null;
        }

        // Touch last seen (best effort)
        $upd = $pdo->prepare('UPDATE sessions SET last_seen_at = CURRENT_TIMESTAMP WHERE session_token = :tok');
        $upd->execute([':tok' => $token]);

        return (int)$row['user_id'];
    }

    public static function revokeSession(string $token): void
    {
        $pdo = Database::pdo();
        $stmt = $pdo->prepare('UPDATE sessions SET revoked_at = CURRENT_TIMESTAMP WHERE session_token = :tok');
        $stmt->execute([':tok' => $token]);
    }
}

