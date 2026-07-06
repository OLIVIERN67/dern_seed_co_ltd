<?php
declare(strict_types=1);

namespace App\Utils;

final class Crypto
{
    public static function randomToken(int $bytes = 32): string
    {
        return bin2hex(random_bytes($bytes));
    }
}

