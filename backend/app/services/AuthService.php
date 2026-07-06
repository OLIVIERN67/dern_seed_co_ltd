<?php
declare(strict_types=1);

namespace App\Services;

use App\Repositories\UserRepository;
use App\Utils\Auth;

final class AuthService
{
    public static function register(string $name, string $email, string $password): array
    {
        $existing = UserRepository::findByEmail($email);
        if ($existing) {
            throw new \RuntimeException('Email already registered');
        }

        $hash = password_hash($password, PASSWORD_BCRYPT);
        $userId = UserRepository::create($name, $email, $hash);

        $session = Auth::createSession($userId);
        return [
            'user_id' => $userId,
            'session_token' => $session['token'],
            'expires_at_ts' => $session['expiresAtTs'],
        ];
    }

    public static function login(string $email, string $password): array
    {
        $user = UserRepository::findByEmail($email);
        if (!$user || empty($user['password_hash'])) {
            throw new \RuntimeException('Invalid credentials');
        }

        if (!password_verify($password, $user['password_hash'])) {
            throw new \RuntimeException('Invalid credentials');
        }

        $session = Auth::createSession((int)$user['id']);
        return [
            'user' => $user,
            'session_token' => $session['token'],
            'expires_at_ts' => $session['expiresAtTs'],
        ];
    }
}

