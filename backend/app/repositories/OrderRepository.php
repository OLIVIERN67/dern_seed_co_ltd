<?php
declare(strict_types=1);

namespace App\Repositories;

use App\Config\Database;
use PDO;

final class OrderRepository
{
    public static function create(int $userId, string $productName, int $quantity, float $totalAmount): int
    {
        $pdo = Database::pdo();
        $stmt = $pdo->prepare('INSERT INTO orders (user_id, product_name, quantity, total_amount) VALUES (:uid, :p, :q, :t)');
        $stmt->execute([
            ':uid' => $userId,
            ':p' => $productName,
            ':q' => $quantity,
            ':t' => $totalAmount,
        ]);
        return (int)$pdo->lastInsertId();
    }

    public static function listByUserId(int $userId): array
    {
        $pdo = Database::pdo();
        $stmt = $pdo->prepare('SELECT id, product_name, quantity, total_amount, status, created_at, updated_at FROM orders WHERE user_id = :uid ORDER BY id DESC');
        $stmt->execute([':uid' => $userId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function findByIdAndUserId(int $id, int $userId): ?array
    {
        $pdo = Database::pdo();
        $stmt = $pdo->prepare('SELECT id, product_name, quantity, total_amount, status, created_at, updated_at FROM orders WHERE id = :id AND user_id = :uid LIMIT 1');
        $stmt->execute([':id' => $id, ':uid' => $userId]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ?: null;
    }

    public static function updateByIdAndUserId(int $id, int $userId, array $fields): void
    {
        $pdo = Database::pdo();

        $allowed = ['product_name', 'quantity', 'total_amount', 'status'];
        $sets = [];
        $params = [':id' => $id, ':uid' => $userId];

        foreach ($fields as $k => $v) {
            if (!in_array($k, $allowed, true)) continue;
            $sets[] = "$k = :$k";
            $params[":{$k}"] = $v;
        }

        if (!$sets) return;

        $sql = 'UPDATE orders SET ' . implode(', ', $sets) . ' WHERE id = :id AND user_id = :uid';
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
    }

    public static function deleteByIdAndUserId(int $id, int $userId): void
    {
        $pdo = Database::pdo();
        $stmt = $pdo->prepare('DELETE FROM orders WHERE id = :id AND user_id = :uid');
        $stmt->execute([':id' => $id, ':uid' => $userId]);
    }
}

