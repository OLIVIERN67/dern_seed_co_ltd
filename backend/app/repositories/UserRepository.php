<?php
declare(strict_types=1);

namespace App\Repositories;

use App\Config\Database;
use PDO;

final class UserRepository
{
    public static function findByEmail(string $email): ?array
    {
        $pdo = Database::pdo();
        $stmt = $pdo->prepare('SELECT id, name, email, password_hash, role, is_active FROM users WHERE email = :email AND is_active = 1 LIMIT 1');
        $stmt->execute([':email' => $email]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ?: null;
    }

    public static function create(string $name, string $email, string $passwordHash): int
    {
        $pdo = Database::pdo();
        $stmt = $pdo->prepare('INSERT INTO users (name, email, password_hash) VALUES (:name, :email, :ph)');
        $stmt->execute([
            ':name' => $name,
            ':email' => $email,
            ':ph' => $passwordHash,
        ]);
        return (int)$pdo->lastInsertId();
    }

    public static function findById(int $id): ?array
    {
        $pdo = Database::pdo();
        $stmt = $pdo->prepare('SELECT id, name, email, role, is_active, created_at, updated_at FROM users WHERE id = :id AND is_active = 1 LIMIT 1');
        $stmt->execute([':id' => $id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ?: null;
    }

    public static function updateMe(int $id, string $name): void
    {
        $pdo = Database::pdo();
        $stmt = $pdo->prepare('UPDATE users SET name = :name WHERE id = :id AND is_active = 1');
        $stmt->execute([':name' => $name, ':id' => $id]);
    }
}

