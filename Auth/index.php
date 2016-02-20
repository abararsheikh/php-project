<?php

/**
 * @Author Yi Zhao
 *
 */
namespace Project\Auth;
use Project\Classes\Navigation;
use Project\Classes\Router;

include '../autoloader.php';

$authRouter = new Router();
$auth = new AuthController();
$authNav = new Navigation();




$authRouter->get('/ as Home', function() {
  echo 'auth page';
});

$authRouter->get('/login as Login', $auth->action('loginPage'));
$authRouter->post('/login', $auth->action('processLogin'));
$authRouter->get('/logout as Logout', $auth->action('logout'));
$authRouter->get('/register as Register', $auth->action('registerPage'));
$authRouter->post('/register', $auth->action('registerUser'));

//$authRouter->dumpRoutes();
$authNav->register($authRouter->getRoutes('method', 'GET'));
$authNav->displayNav('li');

$authRouter->start();


