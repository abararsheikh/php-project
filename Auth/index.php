<?php

/**
 * @Author Yi Zhao
 *
 */
namespace Project\Auth;
use Project\Classes\Router as Router;

include '../autoloader.php';

$authRouter = new Router();
$auth = new AuthController();

$authRouter->get('/', function() {
  echo 'auth page';
});

$authRouter->get('/login', $auth->action('loginPage'));
$authRouter->post('/login', $auth->action('processLogin'));
$authRouter->get('/logout', $auth->action('logout'));

//$authRouter->dumpRoutes();

$authRouter->start();


