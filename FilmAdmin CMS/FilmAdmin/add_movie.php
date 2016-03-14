<?php
//connect to database
require_once('database.php');
// Get the value from the form
$film_id = $_POST['film_id'];
$title = $_POST['title'];
$releaseDate = $_POST['releaseDate'];
$director = $_POST['director'];
$cast = $_POST['cast'];
//$img = $_POST['img'];

// Image
$file_get = $_FILES['img1']['name'];
$temp = $_FILES['img1']['tmp_name'];

$file_to_saved = "../Assets/image/HomePage/".$file_get;

//Documents folder, should exist in your host in there you're going to save the file just uploaded

move_uploaded_file($temp, $file_to_saved);

//echo $file_to_saved;



 // Image part ends here

// Validate inputs
if (empty($title) || empty($releaseDate) || empty($cast) || empty($director) ) {
    $error = "Invalid Movie data. Check all fields and try again.";
    echo $error;
} else {
    // If valid, Add the movie to the database

    $query = "INSERT INTO moviefeature (title ,releaseDate,director,cast,img) VALUES ('$title','$releaseDate','$director','$cast','$file_to_saved')";
    $db->exec($query);

    // Display the Movie List page
    header('location: movieindex.php');
}