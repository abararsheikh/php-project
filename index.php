<?php
use Project\Classes\Router\Nav;
use Project\Classes\View;

include_once 'autoloader.php';


Nav::group('/ as Homepage', function () {
  Nav::get('/ as Home', function () { /*echo 'homepage';*/ });
  Nav::get('/cinemas as Cinemas', function () { echo 'cinemas'; });
  Nav::get('/movies as Movies', function () { echo 'movies'; });
  Nav::get('/booking as Booking', function () { echo 'booking'; });
  Nav::get('/career as Career', function () { echo 'career'; });

});

Nav::start();

$navTemplate = [
  '<ul class="nav navbar-nav">',
  '<li class="%selected%"><a href="%link%">%name%</a></li>',
  '</ul>',
  'selected' => 'active',
];


?>

<!Doctype HTML>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="css/bootstrap.min.css"/>
  <link rel="stylesheet" href="css/style.css"/>

  <title>Homepage</title>
</head>


<body>
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">Cinema</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <?php Nav::drawMenu('Homepage', $navTemplate); ?>

      <!--   search   -->
      <form class="navbar-form navbar-right" role="search">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Search">
        </div>
        <button type="submit" class="btn btn-default">Submit</button>
      </form>

    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
<section id="slider" class="container-fluid">
  <h2 class=hidden>slide show</h2>

  <div class="row">
    <div class="slides">
      <img alt="pic" src="image/slide.jpg"/>
    </div>
  </div>
</section>

<main id="main-content">
  <section class="container">
    <div class="row">
      <div class="col-lg-8 col-sm-8 col-md-8">
        <div class="row">
          <ul class="nav nav-tabs home-tab">
            <li><a class="active-link">Now Showing</a></li>
            <li><a>Coming Soon</a></li>
          </ul>
        </div>

        <div class="row film-gallery">
          <div class="film-container col-lg-4 col-md-4 col-sm-4 col-xs-4">
            <img alt="film1" src="image/film1.jpg"/>

            <p class="film-title">FITOOR (ATMOS)(U)</p>

            <p class="film-detail">
              Stars:
              <span>Aditya Roy Kapur, Tabu , Katrina Kaif</span><br>
              Director:
              <span>Abhishek Kapoor</span>
            </p>
            <button type="button" class="btn btn-default btn-booking">Book Now</button>
          </div>

          <div class="film-container col-lg-4 col-md-4 col-sm-4 col-xs-4">
            <img alt="film1" src="image/film1.jpg"/>

            <p class="film-title">FITOOR (ATMOS)(U)</p>

            <p class="film-detail">
              Stars:
              <span>Aditya Roy Kapur, Tabu , Katrina Kaif</span><br>
              Director:
              <span>Abhishek Kapoor</span>
            </p>
            <button type="button" class="btn btn-default btn-booking">Book Now</button>
          </div>

          <div class="film-container col-lg-4 col-md-4 col-sm-4 col-xs-4">
            <img alt="film1" src="image/film1.jpg"/>

            <p class="film-title">FITOOR (ATMOS)(U)</p>

            <p class="film-detail">
              Stars:
              <span>Aditya Roy Kapur, Tabu , Katrina Kaif</span><br>
              Director:
              <span>Abhishek Kapoor</span>
            </p>
            <button type="button" class="btn btn-default btn-booking">Book Now</button>
          </div>
        </div>

      </div>

      <div class="col-lg-4 col-sm-4 col-md-4 ">
        <div class="booking-form">
          <h2>Book Tickets</h2>

          <form action="#" method="post">
            <div class="form-space">
              <select name="select-movie">
                <option value="movie">Select Movie</option>
                <option value="film1">option1</option>
                <option value="film2">option2</option>
                <option value="film3">option3</option>
              </select>
            </div>

            <div class="form-space">
              <select class="" name="select-Date">
                <option value="date">Select Date</option>
                <option value="date1">option1</option>
                <option value="date2">option2</option>
                <option value="data3">option3</option>
              </select>
            </div>

            <div class="form-space">
              <select class="" name="select-Time">
                <option value="time">Select Time</option>
                <option value="time1">option1</option>
                <option value="time2">option2</option>
                <option value="time3">option3</option>
              </select>
            </div>

            <button type="button" class="btn btn-default btn-booking">Book Now
              <img alt="arrow pic" class="btn-arrow" src="image/btn-arrow.png"/>
            </button>
          </form>

        </div>

        <div class="about-us">
          <h2>ABOUT US</h2>

          <p>PVR's Director's Cut®, the luxury arm of PVR Cinemas, blends the best in high-end hospitality and
            entertainment.</p>
        </div>
      </div>
    </div>


  </section>

  <section id="top-movie" class="container">
    <h2>Top rated</h2>

    <div class="movie-list row">

      <div class="col-sm-3 col-xs-7">
        <img alt="film1" src="image/kongfupanda.jpg"/>
      </div>

      <div class="col-sm-3 col-xs-5">

        <h3><img src="image/arrow-highlight.png"/>Kung Fu Panda 3</h3>

        <p>Top 1</p>

        <p>$ 26.00M</p>

        <P>Running Time:<span> 1h 35m</span></P>

        <p>Opening: Jan 29, 2016</p>
      </div>


      <div class="col-sm-3 col-xs-7">
        <img alt="film1" src="image/starwar.jpg"/>
      </div>

      <div class="col-sm-3 col-xs-5">
        <h3><img src="image/arrow-highlight.png"/>Kung Fu Panda 3</h3>

        <p>Top 2</p>

        <p>$ 26.00M</p>

        <P>Running Time:<span> 1h 35m</span></P>

        <p>Opening: Jan 29, 2016</p>
      </div>


    </div>

    <div class="movie-list row">

      <div class="col-sm-3 col-xs-7">
        <img alt="film1" src="image/stevejobs.jpg"/>
      </div>

      <div class="col-sm-3 col-xs-5">
        <h3><img src="image/arrow-highlight.png"/>Kung Fu Panda 3</h3>

        <p>Top 3</p>

        <p>$ 26.00M</p>

        <P>Running Time:<span> 1h 35m</span></P>

        <p>Opening: Jan 29, 2016</p>
      </div>


      <div class="col-sm-3 col-xs-7">
        <img alt="film1" src="image/TheRevenant.jpg"/>
      </div>

      <div class="col-sm-3 col-xs-5">
        <h3><img src="image/arrow-highlight.png"/>Kung Fu Panda 3</h3>

        <p>Top 4</p>

        <p>$ 26.00M</p>

        <P>Running Time:<span> 1h 35m</span></P>

        <p>Opening: Jan 29, 2016</p>
      </div>

    </div>
  </section>
</main>
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="js/bootstrap.min.js"></script>
</body>
</html>
