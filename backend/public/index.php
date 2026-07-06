<?php
declare(strict_types=1);

require_once __DIR__ . '/../app/bootstrap.php';

use App\Core\Router;
use App\Core\Request;
use App\Core\Response;
use App\Routes\ApiRoutes;

$router = new Router();
ApiRoutes::register($router);

$request = Request::fromGlobals();
$response = new Response();

try {
    $router->dispatch($request, $response);
} catch (Throwable $e) {
    $response->json(['error' => 'Internal Server Error'], 500);
}

