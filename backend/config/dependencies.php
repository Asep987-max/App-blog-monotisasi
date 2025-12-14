<?php

use Psr\Container\ContainerInterface;
use App\Controllers\AuthController;
use App\Controllers\ArticleController;
use App\Controllers\AdPlacementController;
use App\Services\AuthService;

return [
    // Database Connection
    'db' => function (ContainerInterface $c) {
        $db = require __DIR__ . '/database.php';
        return $db();
    },

    // Services
    AuthService::class => function (ContainerInterface $c) {
        return new AuthService();
    },

    // Controllers
    AuthController::class => function (ContainerInterface $c) {
        return new AuthController($c->get(AuthService::class));
    },

    ArticleController::class => function (ContainerInterface $c) {
        return new ArticleController();
    },

    AdPlacementController::class => function (ContainerInterface $c) {
        return new AdPlacementController();
    },
];
