<?php

// Get FilmIDs
$film_id = $_POST['film_id'];

// Delete the product from the database
use Project\Classes\DB\DB;
include '../../autoloader.php';
require_once '../Model/Filmadmin.php';
//$db = DB::getDB();
$deleteMovies = new Filmadmin();
$deleteMovies->deleteMovie($film_id);

// Redirect to display the Product List
header('location: ../View/movieindex.php');
?>