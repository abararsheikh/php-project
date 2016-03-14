<?php
//$film_id = $_POST['film_id'];
?>

<form action="add_movie.php" method="post" enctype="multipart/form-data">
    <input type="hidden" name="film_id" value="<?php echo $film_id; ?>">
    <label>Title :</label>
    <input type="input" name="title" />
    <br />

    <label>Release Date :</label>
    <input type="input" name="releaseDate"/>
    <br />

    <label>Director :</label>
    <input type="input" name="director" />
    <br />

    <label>Cast :</label>
    <textarea  name="cast" >  </textarea>


    <br />
<!--
    <label>Image :</label>
    <input type="input" name="img" />
-->
    <label>Image :</label>
    <input type="file" name="img1" />
    <p>
    <br/>

    <label>&nbsp;</label>
    <input type="submit" value="Add Movie" />
    <br />
</form>