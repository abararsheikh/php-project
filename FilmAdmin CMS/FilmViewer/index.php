<?php
require_once ('database.php');

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
        <section id="slider" class="container-fluid">
           <h2 class=hidden>slide show</h2>
           <div class="row">
            <div class="slides">
                <img alt="pic" src="../Assets/image/HomePage/slide.jpg"/>
            </div>
            </div>
        </section>

         <main id="main-content">
         <section  class="container">
            <div class="row">
             <div class="col-lg-8 col-sm-8 col-md-8">
                    <div class="row">
                         <ul class="nav nav-tabs home-tab">
                             <li><a class="active-link">Now Showing</a></li>
                             <li><a>Coming Soon</a></li>
                         </ul>
                    </div>

                    <div class="row film-gallery">
                        <?php foreach($allMovies as $displayMovie) : ?>
                         <div class="film-container col-lg-4 col-md-4 col-sm-4 col-xs-4">

                             <img alt="film1" src="<?php echo $displayMovie['img'] ?>"/>
                             <p class="film-title"><?php echo $displayMovie['title'] ?>(U)</p>
                             <p class="film-detail">
Stars:
                                 <span><?php echo $displayMovie['cast']?></span><br>
Director:
                                 <span><?php echo $displayMovie['director']?></span>
                             </p>
                             <button type="button" class="btn btn-default btn-booking">Book Now</button>
                         </div>
                        <?php endforeach; ?>
                    </div>

<!--
             <div class="col-lg-4 col-sm-4 col-md-4 ">
                   <div class="booking-form">
                    <h2>Book Tickets</h2>
                     <form action="#" method="post" >
                        <div class="form-space">
                                 <select name="select-movie">
                                     <option value ="movie">Select Movie</option>
                                     <option value ="film1">option1</option>
                                     <option value ="film2">option2</option>
                                     <option value ="film3">option3</option>
                                 </select>
                        </div>

                        <div class="form-space">
                             <select class="" name="select-Date">
                                 <option value ="date">Select Date</option>
                                 <option value ="date1">option1</option>
                                 <option value ="date2">option2</option>
                                 <option value ="data3">option3</option>
                             </select>
                         </div>

                         <div class="form-space">
                             <select class="" name="select-Time">
                             <option value ="time">Select Time</option>
                             <option value ="time1">option1</option>
                             <option value ="time2">option2</option>
                             <option value ="time3">option3</option>
                             </select>
                         </div>

                         <button type="button" class="btn btn-default btn-booking">Book Now
<img  alt="arrow pic" class="btn-arrow" src="../Assets/image/btn-arrow.png"/>
                         </button>
                     </form>

                 </div>

                  <div class="about-us">
                      <h2>ABOUT US</h2>
                      <p>PVR's Director's Cut®, the luxury arm of PVR Cinemas, blends the best in high-end hospitality and entertainment.</p>
                  </div>
             </div>
             </div>


         </section>

         <section id="top-movie" class="container">
             <h2>Top rated</h2>
             <div class="movie-list row">

                     <div class="col-sm-3 col-xs-7">
                         <img alt="film1" src="../Assets/image/kongfupanda.jpg"/>
                     </div>

                     <div class="col-sm-3 col-xs-5">

                         <h3><img src="../Assets/image/arrow-highlight.png"/>Kung Fu Panda 3</h3>
                         <p>Top 1</p>
                         <p>$ 26.00M</p>
                         <P>Running Time:<span> 1h 35m</span></P>
                         <p>Opening: Jan 29, 2016</p>
                     </div>


                     <div class="col-sm-3 col-xs-7">
                         <img alt="film1" src="../Assets/image/starwar.jpg"/>
                     </div>

                     <div class="col-sm-3 col-xs-5">
                         <h3><img src="../Assets/image/arrow-highlight.png"/>Kung Fu Panda 3</h3>
                         <p>Top 2</p>
                         <p>$ 26.00M</p>
                         <P>Running Time:<span> 1h 35m</span></P>
                         <p>Opening: Jan 29, 2016</p>
                     </div>




             </div>

              <div class="movie-list row">

                     <div class="col-sm-3 col-xs-7">
                         <img alt="film1" src="../Assets/image/stevejobs.jpg"/>
                     </div>

                     <div class="col-sm-3 col-xs-5">
                         <h3><img src="../Assets/image/arrow-highlight.png"/>Kung Fu Panda 3</h3>
                         <p>Top 3</p>
                         <p>$ 26.00M</p>
                         <P>Running Time:<span> 1h 35m</span></P>
                         <p>Opening: Jan 29, 2016</p>
                     </div>


                     <div class="col-sm-3 col-xs-7">
                         <img alt="film1" src="../Assets/image/TheRevenant.jpg"/>
                     </div>

                     <div class="col-sm-3 col-xs-5">
                         <h3><img src="../Assets/image/arrow-highlight.png"/>Kung Fu Panda 3</h3>
                         <p>Top 4</p>
                         <p>$ 26.00M</p>
                         <P>Running Time:<span> 1h 35m</span></P>
                         <p>Opening: Jan 29, 2016</p>
                     </div>

              </div>
         </section>
  -->

         </main>
          <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="../Assets/js/bootstrap.min.js"></script>
    </body>
</html>