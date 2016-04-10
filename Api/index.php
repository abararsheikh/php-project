<?php

include '../autoloader.php';

use Project\Classes\Router\Nav;

$apiController = 'Project\Api\ApiController';

Nav::group('/Api', function() use($apiController) {
  Nav::get('/menu', "$apiController@MenuAll");
  Nav::get('/menu/:name', "$apiController@Menu");
  Nav::post('/menu', "$apiController@SaveMenu");

  Nav::get('/page/:id', "$apiController@GetPage");
});

Nav::start();