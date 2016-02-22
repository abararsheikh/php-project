<?php

/**
 * @Author Yi Zhao
 *
 */
namespace Project\Auth;
use Project\Classes\Router\Navigation;

include '../autoloader.php';

$auth = new AuthController();

$nav = new Navigation('Auth');
$nav->add('/ as Home', ['header.php', 'footer.php']);
$nav->add('/login as Login', $auth->action('loginPage'));
$nav->add('/register as Register', $auth->action('registerPage'));
$nav->add('/logout as Logout', $auth->action('logout'));

$nav->post('/login', $auth->action('processLogin'));
$nav->post('/register', $auth->action('registerUser'));

$navTest = new Navigation('User navigation', '/User');
$navTest->add('/ as User', ['header.php']);

?>

<?php $nav->start(); ?>

