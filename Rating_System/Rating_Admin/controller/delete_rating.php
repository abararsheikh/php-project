<?php
// Get FilmIDs
$rating_id = $_POST['rating_id'];
// Delete the product from the database
use Project\Classes\DB\DB;
include '../../../autoloader.php';
require_once '../../Model/Ratings.php';
include '../../database.php';
$deleteRatings = new Ratings();
$deleteRatings->deleteMovie($rating_id);
header('location: ../View/Ratings_Index.php');     // Redirect to display the Rating List
?>