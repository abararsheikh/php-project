<?php

/**
 * @Author Yi Zhao
 *
 */
namespace Project\Auth;
use Project\Classes\Router as Router;

include '../autoloader.php';

$router = new Router();
$auth = new AuthController();

$router->get('/', function() {
  echo 'auth page';
});

$router->get('/login', $auth->action('loginPage'));
$router->post('/login', $auth->action('processLogin'));

$router->get('/logout', $auth->action('logout'));


$router->dumpRoutes();

$router->start();

