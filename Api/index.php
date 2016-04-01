<?php

include '../autoloader.php';

use Project\Classes\Router\Nav;

$apiController = new \Project\Api\ApiController();

Nav::group('/Api', function() use($apiController) {
  Nav::get('/menu', $apiController->action('Menu'));
  Nav::post('/menu', $apiController->action('SaveMenu'));
});

Nav::start();