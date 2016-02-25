<?php

/**
 * @Author Yi Zhao
 *
 */
namespace Project\Auth;
use Project\Classes\Router\Nav;
use Project\Classes\View;

include '../autoloader.php';

$auth = new AuthController();


Nav::group('/Auth as Auth', [
  ['/ as Home', View::useContent('header.php', 'footer.php')],
  ['/login as Login', $auth->action('loginPage')],
  ['/logout as Logout', $auth->action('logout')],
  ['/register as Register', $auth->action('registerPage')],

  ['/login', $auth->action('processLogin'), 'POST'],
  ['/register', $auth->action('registerUser'), 'POST'],

], true);

Nav::get('/Auth/ as Test', View::useContent('header.php', 'footer.php'));

Nav::startRouting();


?>



