<?php
use Project\Classes\Router\Nav;
use Project\Classes\View;

Nav::group('/ as Homepage', function () {
  Nav::get('/ as Home', function () { /*echo 'homepage';*/ });
  Nav::get('/cinemas as Cinemas', function () { echo 'cinemas'; });
  Nav::get('/movies as Movies', function () { echo 'movies'; });
  Nav::get('/booking as Booking', function () { echo 'booking'; });
  Nav::get('/career as Career', function () { echo 'career'; });

});


$navTemplate = [
    '<ul class="nav navbar-nav">',
    '<li class="%selected%"><a href="%link%">%name%</a></li>',
    '</ul>',
    'selected' => 'active',
];
?>

<!Doctype HTML>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="/Assets/css/bootstrap.min.css"/>
  <link rel="stylesheet" href="/Assets/css/style.css"/>
  <title>Homepage</title>
</head>


<body>
<div class="pull-right">
  <div id="login"></div>
</div>

<div id="menuDisplay" data-menuName="Main"></div>

<!--   login   -->


