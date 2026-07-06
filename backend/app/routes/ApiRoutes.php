<?php
declare(strict_types=1);

namespace App\Routes;

use App\Core\Router;
use App\Middleware\AuthMiddleware;
use App\Controllers\AuthController;
use App\Controllers\UserController;
use App\Controllers\OrderController;

final class ApiRoutes
{
    public static function register(Router $router): void
    {
        // Auth
        $router->add('POST', '/api/auth/register', [AuthController::class, 'register']);
        $router->add('POST', '/api/auth/login', [AuthController::class, 'login']);
        $router->add('POST', '/api/auth/logout', [AuthController::class, 'logout'], [
            [AuthMiddleware::class, 'requireAuth']
        ]);

        // Users (protected)
        $router->add('GET', '/api/users/me', [UserController::class, 'me'], [
            [AuthMiddleware::class, 'requireAuth']
        ]);
        $router->add('PATCH', '/api/users/me', [UserController::class, 'updateMe'], [
            [AuthMiddleware::class, 'requireAuth']
        ]);

        // Orders (protected)
        $router->add('POST', '/api/orders', [OrderController::class, 'create'], [
            [AuthMiddleware::class, 'requireAuth']
        ]);
        $router->add('GET', '/api/orders', [OrderController::class, 'list'], [
            [AuthMiddleware::class, 'requireAuth']
        ]);
        $router->add('GET', '/api/orders/{id}', [OrderController::class, 'getById'], [
            [AuthMiddleware::class, 'requireAuth']
        ]);
        $router->add('PATCH', '/api/orders/{id}', [OrderController::class, 'updateById'], [
            [AuthMiddleware::class, 'requireAuth']
        ]);
        $router->add('DELETE', '/api/orders/{id}', [OrderController::class, 'deleteById'], [
            [AuthMiddleware::class, 'requireAuth']
        ]);
    }
}

