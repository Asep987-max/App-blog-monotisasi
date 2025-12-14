<?php

use Illuminate\Database\Capsule\Manager as Capsule;

return function () {
    $capsule = new Capsule;
    $capsule->addConnection([
        'driver'    => 'mysql',
        'host'      => $_ENV['DB_HOST'] ?? '127.0.0.1',
        'database'  => $_ENV['DB_NAME'] ?? 'veritas',
        'username'  => $_ENV['DB_USER'] ?? 'user',
        'password'  => $_ENV['DB_PASS'] ?? 'password',
        'charset'   => 'utf8',
        'collation' => 'utf8_unicode_ci',
        'prefix'    => '',
    ]);

    // Make this Capsule instance available globally via static methods
    $capsule->setAsGlobal();

    // Setup the Eloquent ORM
    $capsule->bootEloquent();

    return $capsule;
};
