<?php
declare(strict_types=1);

namespace App\Middleware;

use App\Core\Request;
use App\Core\Response;
use App\Utils\Auth;

final class AuthMiddleware
{
    public static function requireAuth(Request $req, Response $res, callable $next): void
    {
        $cookieName = Auth::sessionCookieName();
        $token = (string)($req->cookies[$cookieName] ?? '');
        if ($token === '') {
            $res->json(['error' => 'Unauthorized'], 401);
            return;
        }

        $userId = Auth::getUserIdFromSessionToken($token);
        if ($userId === null) {
            $res->json(['error' => 'Unauthorized'], 401);
            return;
        }

        // Attach to request query for simplicity
        $req->query['user_id'] = $userId;

        $next($req, $res);
    }
}

