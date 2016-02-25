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
  ['/ as Home', View::useContent('header.php', 'footer.php'), 'GET'],
//  ['/2 as Home2', View::useContent('header.php', 'footer.php'), 'GET'],

  Nav::group('/Test2 as Test2', [
    ['/logout111 as Logout', $auth->action('logout'), 'GET'],
    ['/logout222 as Logout', $auth->action('logout'), 'GET'],
  ]),

//  ['/home as home', $auth->action('logout'), 'GET'],

], true);
//
//Nav::group('/Test3 as Teset3', [
//    ['/logout222 as Logout', $auth->action('logout'), 'GET'],
//], true);

var_dump('group', Nav::$groups);


//var_dump('group', Nav::setRoot(Nav::$groups['Auth'], ''));

?>



