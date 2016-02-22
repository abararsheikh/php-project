<?php
/**
 * Author: Yi Zhao
 * Date: 16/02/16
 */

$authNav = \Project\Classes\Navs::get('Auth');

?>

<h1>header</h1>
<ul>
  <?php $authNav->displayNav()?>
</ul>


