<?php

include '../../autoloader.php';
include "AdminController.php";

use Project\Classes\Request;
use Project\Classes\Router\Nav;
// single quote


Nav::group('/admin as admin', function() {
  $controller = 'AdminController';

  Nav::get('/home as Home', "$controller@home");
  Nav::get('/movie as Add Movies', "$controller@movies");
  Nav::get('/contact as Admin Contact ', "$controller@contact");
  Nav::get('/rating as Admin Rating ', "$controller@rating");
  Nav::get('/menu as Menu Editor', "$controller@menu");
  Nav::get('/page as Custom Page', "$controller@customPage");
});

Nav::start();
