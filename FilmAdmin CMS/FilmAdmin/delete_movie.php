<?php

// Get FilmIDs
$film_id = $_POST['film_id'];

// Delete the product from the database
require_once('database.php');
$query = "DELETE FROM moviefeature
          WHERE film_id = '$film_id' ";
$db->exec($query);

// display the Product List page
header('location: movieindex.php');
?>