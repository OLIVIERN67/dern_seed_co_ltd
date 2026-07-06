<?php
declare(strict_types=1);

namespace App\Core;

use App\Core\Request;
use App\Core\Response;

final class Router
{
    /** @var array<string, array<string, array{0: callable, 1: array}> > */
    private array $routes = [];

    public function add(string $method, string $path, callable $handler, array $middleware = []): void
    {
        $method = strtoupper($method);
        $this->routes[$method][$path] = [$handler, $middleware];
    }

    public function dispatch(Request $request, Response $response): void
    {
        $method = $request->method;
        $path = rtrim($request->path, '/') ?: '/';

        // Exact match first
        foreach ([$path] as $candidate) {
            if (isset($this->routes[$method][$candidate])) {
                [$handler, $middleware] = $this->routes[$method][$candidate];
                $this->runMiddlewareAndHandler($request, $response, $handler, $middleware);
                return;
            }
        }

        // Param match: /api/orders/{id}
        foreach ($this->routes[$method] ?? [] as $routePath => $tuple) {
            if (!str_contains($routePath, '{')) continue;

            $regex = preg_replace('#\{[a-zA-Z_][a-zA-Z0-9_]*\}#', '([a-zA-Z0-9_-]+)', $routePath);
            $regex = '#^' . rtrim($regex, '/') . '$#';

            if (is_string($regex) && preg_match($regex, $path, $matches)) {
                $paramNames = [];
                if (preg_match_all('#\{([a-zA-Z_][a-zA-Z0-9_]*)\}#', $routePath, $n)) {
                    $paramNames = $n[1];
                }

                foreach ($paramNames as $i => $name) {
                    if (isset($matches[$i + 1])) {
                        $request->query[$name] = $matches[$i + 1];
                    }
                }

                [$handler, $middleware] = $tuple;
                $this->runMiddlewareAndHandler($request, $response, $handler, $middleware);
                return;
            }
        }

        $response->json(['error' => 'Not Found'], 404);
    }

    private function runMiddlewareAndHandler(Request $request, Response $response, callable $handler, array $middleware): void
    {
        $next = function (Request $req, Response $res) use ($handler) {
            $handler($req, $res);
        };

        foreach (array_reverse($middleware) as $mw) {
            $prevNext = $next;
            $next = function (Request $req, Response $res) use ($mw, $prevNext) {
                $mw($req, $res, $prevNext);
            };
        }

        $next($request, $response);
    }
}

