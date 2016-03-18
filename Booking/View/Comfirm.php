<!Doctype HTML>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="./css/bootstrap.min.css"/>
        <link rel="stylesheet" href="./css/confirm.css"/>
        
        <title>Comfirm</title>
    </head>
        
    
    <body>
    <!--seat map-->
     
    
    <section id="film-banner" class="container-fluid">
            <h1>Hi <?php echo $_SESSION['user']['username'] ?> You film is ready to pay</h1>
    </section>
     <main>
         <section id="booking-detail" class="container">
            <div class="row">
               <!-- Ticket Detail Parts-->
                <div class="col-gl-8 col-md-8 col-sm-12 ticket-booking">
                 <h2>TICKET BOOKING DETAIL</h2>
                 <?php foreach ($cart->shoppingCart->data as $item):?>

                    <div class="row">
                     <div class="col-gl-5 col-md-5 col-sm-12 detail-row">
                         Movie Name<span>:</span>
                     </div>
                     
                     <div class="col-gl-7 col-md-7 col-sm-12 detail-row">
                         <?php echo $item->Film_Name?>
                     </div> 
                 </div>
                 
                 <div class="row">
                     <div class="col-gl-5 col-md-5 col-sm-12 detail-row">
                         Cinema<span>:</span>
                     </div>
                     
                     <div class="col-gl-7 col-md-7 col-sm-12 detail-row">
                         <?php echo $item->Cinema?>
                     </div> 
                 </div>
                 
                  <div class="row">
                     <div class="col-gl-5 col-md-5 col-sm-12 detail-row">
                         Room<span>:</span>
                     </div>
                     
                     <div class="col-gl-7 col-md-7 col-sm-12 detail-row">
                         <?php echo $item->Room?>
                     </div> 
                 </div>
                 
                  <div class="row">
                     <div class="col-gl-5 col-md-5 col-sm-12 detail-row">
                         Seat(s)<span>:</span>
                     </div>
                     
                     <div class="col-gl-7 col-md-7 col-sm-12 detail-row">
                         <?php echo $item->Seats?>
                     </div> 
                 </div>
                 
                  <div class="row">
                     <div class="col-gl-5 col-md-5 col-sm-12 detail-row">
                         Date & Show Time<span>:</span>
                     </div>
                     
                     <div class="col-gl-7 col-md-7 col-sm-12 detail-row">
                         <?php echo $item->Run_Time?>
                     </div> 
                 </div>

                    <div class="row">
                        <div class="col-gl-5 col-md-5 col-sm-12 detail-row">
                            Cinema Address<span>:</span>
                        </div>

                        <div class="col-gl-7 col-md-7 col-sm-12 detail-row">
                            <?php echo $item->Cinema_Address?>
                        </div>
                    </div>
                     <div class="row">
                         <a href="." class="btn btn-default btn-booking">Edit</a>
                         <a href="." class="btn btn-default btn-booking">Delete</a>
                     </div>
                <?php endforeach; ?>

                 <!--Begin of Design part -->

                </div>

                <div class="col-lg-4 col-sm-12 col-md-4">
                    <h2>ORDER SUMMARY</h2>
                    <table class="table booking-table">
                        <thead>
                            <tr>
                                <th>Movie Ticket</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            <tr>
                                <td>Ticket Cost(s)</td>
                                <td>$1,000.00</td>
                            </tr>
                            
                            <tr>
                                <td>Service Tax</td>
                                <td>$7.25</td>
                            </tr>
                            
                              <tr>
                                <td>Total</td>
                                <td>$1,007.25</td>
                              </tr>
                              
                              <tr>
                                  <td>GRAND TOTAL</td>
                                  <td>$1,007.25</td>
                              </tr>
                              
                              <tr>
                                  <td colspan="2">
                                      <a>PAY NOW</a>
                                  </td>
                              </tr>
                        </tbody>
                        
                    </table>
                </div>
            </div>
         </section>
         
         
          
    </main> 
         
        <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="./js/bootstrap.min.js"></script>
  
    <script src="./js/drop.js"></script>
    </body>
</html> 