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


Nav::group('/Auth as Auth', function() use($auth){
  Nav::get('/ as Home', View::useContent('header.php', 'footer.php'));
  Nav::get('/login as Login', $auth->action('loginPage'));
//  Nav::get('/register as Register', $auth->action('registerPage'));
//  Nav::get('/logout as Logout', $auth->action('logout'));

  Nav::group('/Test as Test', function() use($auth) {
    Nav::get('/logout as Logout', $auth->action('logout'));
//    Nav::get('/logout2 as Logout2', $auth->action('logout'));

  });
  Nav::group('/Testab as Testab', function() use($auth) {
    Nav::get('/logout3 as Logout3', $auth->action('logout'));
//    Nav::get('/logout2 as Logout2', $auth->action('logout'));
  });

  Nav::post('/login', $auth->action('processLogin'));
//  Nav::post('/register', $auth->action('registerUser'));
});

Nav::group('/Test2 as Test', function() use($auth) {
  Nav::get('/logout2 as Logout2', $auth->action('logout'));

});

//Nav::group('/Auth2 as Auth', function() use($auth) {
//  Nav::get('/logout as Logout', $auth->action('logout'));
//
//});


Nav::startRouting();
//Nav::dumpRoutes();
//var_dump(Nav::getGroup('Auth', '/auth'));

//Nav::displayMenu('Test');
var_dump(Nav::rearrange('Auth'));



?>



