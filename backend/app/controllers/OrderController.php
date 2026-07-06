<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Core\Request;
use App\Core\Response;
use App\Services\OrderService;
use App\Utils\Validator;

final class OrderController
{
    public static function create(Request $req, Response $res): void
    {
        $userId = (int)($req->query['user_id'] ?? 0);
        $body = is_array($req->body) ? $req->body : [];

        try {
            $productName = Validator::requireString($body['product_name'] ?? null, 'product_name', 2, 200);
            $quantity = Validator::requireInt($body['quantity'] ?? null, 'quantity', 1, 1000000);
            $total = Validator::requireMoney($body['total_amount'] ?? null, 'total_amount', 0, 100000000);

            $id = OrderService::create($userId, $productName, $quantity, $total);
            $res->json(['ok' => true, 'id' => $id], 201);
        } catch (\Throwable $e) {
            $res->json(['error' => $e->getMessage()], 400);
        }
    }

    public static function list(Request $req, Response $res): void
    {
        $userId = (int)($req->query['user_id'] ?? 0);
        $items = OrderService::list($userId);
        $res->json(['orders' => $items]);
    }

    public static function getById(Request $req, Response $res): void
    {
        $userId = (int)($req->query['user_id'] ?? 0);
        $id = (int)($req->query['id'] ?? 0);

        try {
            $order = OrderService::getById($userId, $id);
            $res->json(['order' => $order]);
        } catch (\Throwable $e) {
            $res->json(['error' => $e->getMessage()], 404);
        }
    }

    public static function updateById(Request $req, Response $res): void
    {
        $userId = (int)($req->query['user_id'] ?? 0);
        $id = (int)($req->query['id'] ?? 0);
        $body = is_array($req->body) ? $req->body : [];

        $fields = [];

        try {
            if (array_key_exists('product_name', $body)) {
                $fields['product_name'] = Validator::requireString($body['product_name'], 'product_name', 2, 200);
            }
            if (array_key_exists('quantity', $body)) {
                $fields['quantity'] = Validator::requireInt($body['quantity'], 'quantity', 1, 1000000);
            }
            if (array_key_exists('total_amount', $body)) {
                $fields['total_amount'] = Validator::requireMoney($body['total_amount'], 'total_amount', 0, 100000000);
            }
            if (array_key_exists('status', $body)) {
                $status = (string)$body['status'];
                $allowed = ['pending','paid','fulfilled','cancelled'];
                if (!in_array($status, $allowed, true)) {
                    throw new \InvalidArgumentException('status invalid');
                }
                $fields['status'] = $status;
            }

            OrderService::updateById($userId, $id, $fields);
            $res->json(['ok' => true]);
        } catch (\Throwable $e) {
            $res->json(['error' => $e->getMessage()], 400);
        }
    }

    public static function deleteById(Request $req, Response $res): void
    {
        $userId = (int)($req->query['user_id'] ?? 0);
        $id = (int)($req->query['id'] ?? 0);

        OrderService::deleteById($userId, $id);
        $res->json(['ok' => true]);
    }
}

