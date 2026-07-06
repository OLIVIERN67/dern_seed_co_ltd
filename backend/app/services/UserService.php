<?php
declare(strict_types=1);

namespace App\Services;

use App\Repositories\UserRepository;

final class UserService
{
    public static function getMe(int $userId): array
    {
        $u = UserRepository::findById($userId);
        if (!$u) {
            throw new \RuntimeException('User not found');
        }
        return $u;
    }

    public static function updateMe(int $userId, string $name): void
    {
        UserRepository::updateMe($userId, $name);
    }
}

