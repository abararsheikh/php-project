<?php

namespace Project\Auth;
use Project\Auth\controllers\AuthController;
use Project\Auth\controllers\OAuthController;
use Project\Classes\Router\Nav;
use Project\Classes\View;

include '../autoloader.php';


$auth = new AuthController();
$oauth = new OAuthController();

Nav::group('/Auth as Auth', function () use($auth) {
  Nav::get('/ as Home', View::useContent('Views/index.php'));
  Nav::get('/register as Register', $auth->action('registerPage'));
  Nav::get('/login as Login', $auth->action('loginPage'));
  Nav::get('/logout as Logout', $auth->action('logout'));

  Nav::post('/login', $auth->action('processLogin'));
  Nav::post('/register', $auth->action('registerUser'));
  Nav::post('/register/user', $auth->action('checkAvailability'));

});

// Oauth
Nav::group('/Auth as OAuth', function() use($oauth) {
  Nav::get('/login/callback', $oauth->action('github'));
});

Nav::start();

?>



