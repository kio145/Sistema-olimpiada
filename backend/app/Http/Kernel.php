protected $middlewareGroups = [
    'web' => [
    ],

    'api' => [
    \Illuminate\Routing\Middleware\HandleCors::class,
    'throttle:api',
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
    ],

];
