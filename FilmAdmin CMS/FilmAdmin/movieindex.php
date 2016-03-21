<?php

use Project\Classes\DB\DB;
$db = DB::getDB();
//require_once ('database.php');

//get all the movies

$queryAllMovies = 'SELECT * FROM moviefeature';
$statement1 = $db->prepare($queryAllMovies);
$statement1->execute();
//$movies = $statement1->fetch();

$allMovies = $statement1->fetchAll();

//$cast = $movies['cast'];
//$director = $movies['director'];
//$language = $movies['language'];
//$title = $movies['title'];


?>

<!Doctype HTML>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../Assets/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="../Assets/css/style.css"/>

    <title>Homepage</title>
</head>


<body>

<main id="main-content">
    <section  class="container">
        <div class="row">
            <div class="col-lg-8 col-sm-8 col-md-8">


                <div class="row film-gallery">
                    <form action="add_movie_form.php" method="post"
                          id="add_movie_form">
                        <input type="submit" value = "Add Movie" class="btn btn-default btn-booking" />
                    </form>
                    <br>
                    <?php foreach($allMovies as $displayMovie) : ?>
                        <div class="film-container col-lg-4 col-md-4 col-sm-4 col-xs-4">

                            <img alt="film1" src="<?php echo $displayMovie['img'] ?>"/>
                            <p class="film-title"><?php echo $displayMovie['title'] ?>(U)</p>
                            <p class="film-detail">
                                Stars:
                                <span><?php echo $displayMovie['cast']?></span><br>
                                Director:
                                <span><?php echo $displayMovie['director']?></span><br/>
                                Release Date :
                                <span><?php echo $displayMovie['releaseDate']?></span>
                            </p>

                            <form action="delete_movie.php" method="post">
                                <input type="hidden" name="film_id"
                                       value="<?php echo $displayMovie['film_id']; ?>" />
                                <input type="submit" value ="Delete" class="btn btn-default btn-booking"/>
                            </form>
                            <br>
                            <form action = "edit_movie.php" method="post">
                                <input type="hidden" name="film_id"
                                       value="<?php echo $displayMovie['film_id']; ?>" />
                                <input type="submit" value = "Update" class="btn btn-default btn-booking"/>
                            </form>

                            <br>
                        </div>

                    <?php endforeach; ?>
                </div>
