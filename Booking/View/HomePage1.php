
<!Doctype HTML>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="./css/bootstrap.min.css"/>
        <link rel="stylesheet" type="text/css" href="./css/slick.css"/>
        <link rel="stylesheet" href="./css/style.css"/>
        
        <title>Homepage</title>
    </head>


    <body>
        <section id="slider" class="container-fluid">
           <h2 class=hidden>slide show</h2>
           <div class="row">
            <div class="slides">
                <img alt="pic" src="./image/slide.jpg"/>
            </div>
            </div>
        </section>
         
         <main id="main-content">
         <section  class="container">
            <div class="row">
             <div class="col-lg-8 col-sm-8 col-md-8">
                    <div class="row">
                         <ul class="nav nav-tabs home-tab">
                             <li class="showing_now">Now Showing</li>
                           		
                              <img class="slick-next" src="./image/ic_arrwnext.png"/>
    						 <img class="slick-prev" src="./image/ic_arrwprev.png"/>
                                                 
                         </ul>
                         
                    </div>
                 
                    <div class="row film-gallery slick-test">
                       <?php foreach ($filmInfo as $film):?>

                             <div class="film-container col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                 <img alt="film1" src='<?php echo $film->Film_pic?>'/>
                                 <p class="film-title"><?php echo $film->Film_Name?></p>
                                 <p class="film-detail">
                                     Stars:
                                     <span><?php echo $film->Film_Actor?></span><br>
                                     Director:
                                     <span><?php echo $film->Film_Director?></span>
                                 </p>

                                 <form method="get" action=".">
                                 <input type="hidden" name="route" value="HomePageController/postToBooking/<?php echo $film->Film_Id?>"/>
                                 <button type="submit" class="btn btn-default btn-booking">Book Now</button>
                                 </form>
                             </div>
                       <?php endforeach; ?>
                    </div>
             </div>
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
                             <img  alt="arrow pic" class="btn-arrow" src="./image/btn-arrow.png"/>
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
             <?php for($i=0; $i<count($filmRate); $i++):?>
             <?php if($i==4){
                     break;
                 } ?>
             <?php if($i%2==0):?>
             <div class="movie-list row">
             <?php endif;?>

                     <div class="col-sm-3 col-xs-7">
                         <img alt="film1" src='<?php echo $filmRate[$i]->Film_pic ?>'/>
                     </div>

                     <div class="col-sm-3 col-xs-5">
                         
                         <h3><img src="./image/arrow-highlight.png"/><?php echo $filmRate[$i]->Film_Name ?></h3>
                         <p>Top <?php $k=$i+1; echo $k?></p>
                         <p>Click Rate:<?php echo $filmRate[$i]->filmClickNum ?></p>
                         <P>Running Time:<span><?php echo $filmRate[$i]->Film_length?></span></P>
                         <p>Opening:<?php echo $filmRate[$i]->Film_Time?></p>
                     </div>
                 <?php if($i%2==1):?>
             </div>
                 <?php endif;?>
             <?php endfor;?>
             

         </section>
         </main>
          <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="../js/bootstrap.min.js"></script>
    <script type="text/javascript" src="./js/slick.min.js"></script>
    <script type="text/javascript" src="./js/homepage.js"></script>
    </body>
</html> 