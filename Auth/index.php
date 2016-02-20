<?php

/**
 * @Author Yi Zhao
 *
 */
namespace Project\Auth;
use Project\Classes\Router;

include '../autoloader.php';

$authRouter = new Router();
$auth = new AuthController();

$authRouter->get('/', function() {
  echo 'auth page';
});

$authRouter->get('/login', $auth->action('loginPage'));
$authRouter->post('/login', $auth->action('processLogin'));
$authRouter->get('/logout', $auth->action('logout'));
$authRouter->get('/register', $auth->action('registerPage'));

//$authRouter->dumpRoutes();

$authRouter->start();


