<?php
use Project\Auth\models\AuthModel;
use Project\Classes\Router\Nav;
use Project\Classes\View;

$navTemplate = [
    '<ul class="nav navbar-nav">',
    '<li class="%selected%"><a href="%link%">%name%</a></li>',
    '</ul>',
    'selected' => 'active',
];

?>
<link rel="stylesheet" href="/Assets/css/bootstrap.min.css"/>
<link rel="stylesheet" href="/Assets/css/style.css"/>

<div class="pull-right">
  <div id="login"></div>
</div>

<div id="menuDisplay" data-menuName="Main"></div>



