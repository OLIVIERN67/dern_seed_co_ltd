<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Core\Request;
use App\Core\Response;
use App\Services\AuthService;
use App\Utils\Auth;
use App\Utils\Validator;

final class AuthController
{
    public static function register(Request $req, Response $res): void
    {
        $body = is_array($req->body) ? $req->body : [];

        try {
            $name = Validator::requireString($body['name'] ?? null, 'name', 2, 120);
            $email = Validator::requireEmail($body['email'] ?? null, 'email');
            $password = Validator::requirePassword($body['password'] ?? null, 'password');

            $out = AuthService::register($name, $email, $password);

            $res->setCookie(
                Auth::sessionCookieName(),
                $out['session_token'],
                (int)$out['expires_at_ts'],
                Auth::sessionCookieSecure(),
                true
            );

            $res->json(['ok' => true, 'user_id' => $out['user_id']]);
        } catch (\Throwable $e) {
            $msg = $e->getMessage();
            $status = str_contains($msg, 'registered') ? 409 : 400;
            $res->json(['error' => $msg], $status);
        }
    }

    public static function login(Request $req, Response $res): void
    {
        $body = is_array($req->body) ? $req->body : [];

        try {
            $email = Validator::requireEmail($body['email'] ?? null, 'email');
            $password = Validator::requireString($body['password'] ?? null, 'password', 1, 200);

            $out = AuthService::login($email, $password);

            $res->setCookie(
                Auth::sessionCookieName(),
                $out['session_token'],
                (int)$out['expires_at_ts'],
                Auth::sessionCookieSecure(),
                true
            );

            $res->json(['ok' => true, 'user' => [
                'id' => (int)$out['user']['id'],
                'name' => (string)$out['user']['name'],
                'email' => (string)$out['user']['email'],
                'role' => (string)$out['user']['role'],
            ]]);
        } catch (\Throwable $e) {
            $res->json(['error' => $e->getMessage()], 401);
        }
    }

    public static function logout(Request $req, Response $res): void
    {
        $cookieName = Auth::sessionCookieName();
        $token = (string)($req->cookies[$cookieName] ?? '');
        if ($token !== '') {
            Auth::revokeSession($token);
        }

        // Expire cookie
        $res->setCookie($cookieName, '', time() - 3600, Auth::sessionCookieSecure(), true);
        $res->json(['ok' => true]);
    }
}

