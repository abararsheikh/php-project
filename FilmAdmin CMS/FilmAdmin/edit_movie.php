<?php

require_once "database.php";
// Get the product data
$film_id = $_POST['film_id'];

$sql = "SELECT * FROM moviefeature WHERE film_id = '$film_id'";
$result = $db->query($sql);
$editMovies = $result->fetch();
?>

<form action="update_movie.php" method="post" enctype="multipart/form-data">
    <input type="hidden" name="film_id" value="<?php echo $film_id; ?>">
    <label>Title :</label>
    <input type="input" name="title" value="<?php echo $editMovies['title']; ?>" />
    <br />

    <label>Release Date :</label>
    <input type="input" name="releaseDate" value="<?php echo $editMovies['releaseDate']; ?>"/>
    <br />

    <label>Director :</label>
    <input type="input" name="director" value="<?php echo $editMovies['director']; ?>" />
    <br />

    <label>Cast :</label>
    <textarea  name="cast" > <?php echo $editMovies['cast']; ?> </textarea>


    <br />
    <img src = "<?php echo $editMovies['img']; ?>" />
    <label>Image :</label>
    <input type="file" name="img1"  />
    <p>

<!--
    <label>Image :</label>
    <input type="input" name="img" value="<?php echo $editMovies['img']; ?>" />
-->
        <p>
    <br />
    <label>&nbsp;</label>
    <input type="submit" value="Update Movie" />
    <br />
</form>

