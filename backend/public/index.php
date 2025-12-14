<?php

use DI\ContainerBuilder;
use Slim\Factory\AppFactory;
use Dotenv\Dotenv;

require __DIR__ . '/../vendor/autoload.php';

// Load .env
$dotenv = Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->safeLoad();

// Build DI Container
$containerBuilder = new ContainerBuilder();
$containerBuilder->addDefinitions(__DIR__ . '/../config/dependencies.php');
$container = $containerBuilder->build();

// Instantiate App
AppFactory::setContainer($container);
$app = AppFactory::create();

// Register Middleware (CORS, Body Parsing)
$app->addBodyParsingMiddleware();
$app->addRoutingMiddleware();

// Register Routes
$routes = require __DIR__ . '/../config/routes.php';
$routes($app);

// Error Handling
$errorMiddleware = $app->addErrorMiddleware(
    $_ENV['DISPLAY_ERROR_DETAILS'] === 'true',
    true,
    true
);

$app->run();
