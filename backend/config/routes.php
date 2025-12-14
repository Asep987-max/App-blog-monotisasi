<?php

use Slim\App;
use Slim\Routing\RouteCollectorProxy;
use App\Controllers\AuthController;
use App\Controllers\ArticleController;
use App\Controllers\AdPlacementController;
use App\Middleware\AuthMiddleware;
use App\Middleware\CorsMiddleware;

return function (App $app) {

    // Global CORS Middleware
    $app->add(new CorsMiddleware());

    $app->group('/api', function (RouteCollectorProxy $group) {

        // Auth Routes
        $group->post('/auth/google', [AuthController::class, 'googleLogin']);

        // Public Article Routes
        $group->get('/articles', [ArticleController::class, 'index']);
        $group->get('/articles/{slug}', [ArticleController::class, 'show']);

        // Public Ad Routes
        $group->get('/ads', [AdPlacementController::class, 'index']);

        // Protected Routes (Admin/Author)
        $group->group('', function (RouteCollectorProxy $protectedGroup) {
            $protectedGroup->post('/articles', [ArticleController::class, 'store']);
            $protectedGroup->put('/admin/ads/{id}', [AdPlacementController::class, 'update']);
        })->add(new AuthMiddleware());
    });
};
