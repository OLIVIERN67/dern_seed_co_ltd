<?php
declare(strict_types=1);

namespace App\Services;

use App\Repositories\OrderRepository;

final class OrderService
{
    public static function create(int $userId, string $productName, int $quantity, float $totalAmount): int
    {
        return OrderRepository::create($userId, $productName, $quantity, $totalAmount);
    }

    public static function list(int $userId): array
    {
        return OrderRepository::listByUserId($userId);
    }

    public static function getById(int $userId, int $id): array
    {
        $o = OrderRepository::findByIdAndUserId($id, $userId);
        if (!$o) throw new \RuntimeException('Order not found');
        return $o;
    }

    public static function updateById(int $userId, int $id, array $fields): void
    {
        OrderRepository::updateByIdAndUserId($id, $userId, $fields);
    }

    public static function deleteById(int $userId, int $id): void
    {
        OrderRepository::deleteByIdAndUserId($id, $userId);
    }
}

