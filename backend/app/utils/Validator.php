<?php
declare(strict_types=1);

namespace App\Utils;

use InvalidArgumentException;

final class Validator
{
    public static function requireString(mixed $value, string $field, int $min = 1, int $max = 255): string
    {
        if (!is_string($value)) {
            throw new InvalidArgumentException("{$field} must be a string");
        }
        $value = trim($value);
        if ($value === '') {
            throw new InvalidArgumentException("{$field} is required");
        }
        if (mb_strlen($value) < $min || mb_strlen($value) > $max) {
            throw new InvalidArgumentException("{$field} length must be between {$min} and {$max}");
        }
        return $value;
    }

    public static function requireEmail(mixed $value, string $field): string
    {
        $email = self::requireString($value, $field, 3, 190);
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException("{$field} must be a valid email");
        }
        return $email;
    }

    public static function requireInt(mixed $value, string $field, int $min, int $max): int
    {
        if (is_string($value) && $value !== '' && ctype_digit($value)) {
            $value = (int)$value;
        }
        if (!is_int($value)) {
            throw new InvalidArgumentException("{$field} must be an integer");
        }
        if ($value < $min || $value > $max) {
            throw new InvalidArgumentException("{$field} must be between {$min} and {$max}");
        }
        return $value;
    }

    public static function requireMoney(mixed $value, string $field, float $min = 0, float $max = 100000000): float
    {
        if (is_string($value)) {
            $value = str_replace(',', '.', trim($value));
        }
        if (!is_numeric($value)) {
            throw new InvalidArgumentException("{$field} must be a number");
        }
        $f = (float)$value;
        if ($f < $min || $f > $max) {
            throw new InvalidArgumentException("{$field} out of range");
        }
        return $f;
    }

    public static function requirePassword(mixed $value, string $field = 'password'): string
    {
        $pw = self::requireString($value, $field, 8, 200);
        // Minimal strength rules (customize as needed)
        if (!preg_match('/[A-Z]/', $pw) || !preg_match('/[a-z]/', $pw) || !preg_match('/\d/', $pw)) {
            throw new InvalidArgumentException("{$field} must include upper/lowercase letters and a number");
        }
        return $pw;
    }
}

