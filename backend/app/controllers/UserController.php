<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Core\Request;
use App\Core\Response;
use App\Services\UserService;
use App\Utils\Validator;

final class UserController
{
    public static function me(Request $req, Response $res): void
    {
        $userId = (int)($req->query['user_id'] ?? 0);
        try {
            $u = UserService::getMe($userId);
            $res->json(['user' => $u]);
        } catch (\Throwable $e) {
            $res->json(['error' => $e->getMessage()], 404);
        }
    }

    public static function updateMe(Request $req, Response $res): void
    {
        $userId = (int)($req->query['user_id'] ?? 0);
        $body = is_array($req->body) ? $req->body : [];

        try {
            $name = Validator::requireString($body['name'] ?? null, 'name', 2, 120);
            UserService::updateMe($userId, $name);
            $res->json(['ok' => true]);
        } catch (\Throwable $e) {
            $res->json(['error' => $e->getMessage()], 400);
        }
    }
}

