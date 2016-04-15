<?php

namespace Project\Auth;

use Project\Classes\Router\Nav;

include '../autoloader.php';


$auth = 'Project\Auth\controllers\AuthController';
$oauth = 'Project\Auth\controllers\OAuthController';

Nav::group('/Auth as Auth', function () use($auth) {
  Nav::get('/ as Home', "$auth@home");
  Nav::get('/register as Register', "$auth@registerPage");
  Nav::get('/login as Login', "$auth@loginPage");
  Nav::get('/admin', "$auth@adminLoginPage");

  Nav::get('/logout as Logout', "$auth@logout");

  Nav::get('/getLogin as Logout', "$auth@getLogin");

  Nav::post('/login', "$auth@processLogin");
  Nav::post('/admin', "$auth@adminLogin");
  Nav::post('/register', "$auth@registerUser");
  Nav::post('/register/user', "$auth@checkAvailability");

});

// Oauth
Nav::group('/Auth as OAuth', function() use($oauth) {
  Nav::get('/login/github', "$oauth@github");
});

Nav::start();

?>



