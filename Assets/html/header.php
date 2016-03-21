<?php
use Project\Classes\Router\Nav;
use Project\Classes\View;

Nav::group('/ as Homepage', function () {
  Nav::get('/ as Home', function () { /*echo 'homepage';*/ });
  Nav::get('/cinemas as Cinemas', function () { echo 'cinemas'; });
  Nav::get('/movies as Movies', function () { echo 'movies'; });
  Nav::get('/Booking as Booking', function () { echo 'booking'; });
  Nav::get('/career as Career', function () { echo 'career'; });

});

Nav::start();

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
  <link rel="stylesheet" href="Assets/css/bootstrap.min.css"/>
  <link rel="stylesheet" href="Assets/css/style.css"/>

  <title>Homepage</title>
</head>


<body>
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">Cinema</a>
    </div>

    <div id="login"></div>
    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <?php Nav::drawMenu('Homepage', $navTemplate); ?>

      <!--   search   -->
      <form class="navbar-form navbar-right" role="search">

        <div class="form-group">
          <input type="text" class="form-control" placeholder="Search">
        </div>
        <button type="submit" class="btn btn-default">Submit</button>
      </form>

    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
