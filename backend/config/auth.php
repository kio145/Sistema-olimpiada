<?php

return [

    'defaults' => [
        'guard'     => 'sanctum',
        'passwords' => 'users',
    ],

    'guards' => [
        // Para sesiones web normales (por si usas autenticación basada en sesión)
        'web' => [
            'driver'   => 'session',
            'provider' => 'users',
        ],

        // Guard que usa Sanctum para tokens de API
        'sanctum' => [
            'driver'   => 'sanctum',
            'provider' => 'users',
        ],

        // Alias api usando Sanctum
        'api' => [
            'driver'   => 'sanctum',
            'provider' => 'users',
        ],

        // Tu guardia especial para administradores (si la quieres separar)
        'admin' => [
            'driver'   => 'session',
            'provider' => 'admins',
        ],
    ],

    'providers' => [
        // Provider por defecto de usuarios (tabla users, modelo User)
        'users' => [
            'driver' => 'eloquent',
            'model'  => App\Models\User::class,
        ],

        // Provider para administradores (tabla administrador, modelo Administrador)
        'admins' => [
            'driver' => 'eloquent',
            'model'  => App\Models\Administrador::class,
        ],
    ],

    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table'    => 'password_reset_tokens',
            'expire'   => 60,
            'throttle' => 60,
        ],

        'admins' => [
            'provider' => 'admins',
            'table'    => 'password_reset_tokens',
            'expire'   => 60,
            'throttle' => 60,
        ],
    ],

    'password_timeout' => 10800,
];
