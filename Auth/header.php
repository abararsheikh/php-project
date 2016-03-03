<?php
/**
 * Author: Yi Zhao
 * Date: 16/02/16
 */
use Project\Classes\Router\Nav;


?>

<h1>header</h1>
<h2>welcome <?php echo \Project\Auth\AuthModel::getUser()?></h2>

<?php Nav::drawMenu('Auth')?>
