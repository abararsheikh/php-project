<?php

include '../../autoloader.php';
include "AdminController.php";

use Project\Classes\Request;
use Project\Classes\Router\Nav;
// single quote
$controller = 'AdminController';

Nav::group('/admin as admin', function() use($controller) {
  Nav::get('/home as Home', "$controller@home"); // GET /admin/home
  Nav::get('/test/:id as Home', function($id, Request $request) { var_dump($request); echo 'test' . $id;}); // GET /admin/home
  Nav::get('/movie as Add Movies', "$controller@movies");// GET /admin/movies
  Nav::post('/home as Add Movies', "$controller@home");// GET /admin/movies
  Nav::get('/contact as Admin Contact ', "$controller@contact");// GET /admin/movies
  Nav::post('/home as Admin Contact ', "$controller@home");// GET /admin/movies
  Nav::get('/rating as Admin Rating ', "$controller@rating");// GET /admin/movies
  Nav::post('/home as Admin Contact ', "$controller@home");// GET /admin/movies
});

Nav::start();
