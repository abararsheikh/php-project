<?php

/**
 * @Author Yi Zhao
 *
 */
namespace Project\Auth;
use Project\Classes\Navigation;

include '../autoloader.php';

$auth = new AuthController();
$nav = new Navigation();


$nav->add('/ as Home', ['header.php', 'footer.php']);
$nav->add('/login as Login', $auth->action('loginPage'));
$nav->add('/register as Register', $auth->action('registerPage'));

$nav->post('/login', $auth->action('processLogin'));
$nav->post('/register', $auth->action('registerUser'));



?>
<h2>navigation</h2>
<?php $nav->displayNav()?>

<?php $nav->start(); ?>