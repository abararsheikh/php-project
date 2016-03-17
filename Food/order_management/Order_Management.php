<?php
?>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <link href="../../Assets/css/bootstrap.min.css" rel="stylesheet" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="../../Assets/js/jquery.min.js" ></script>
    <script src="../../Assets/js/bootstrap.min.js" ></script>
    <link rel="stylesheet" type="text/css" href="../../Assets/css/food-shopping-cart.css" />
    <script src="../../Assets/js/Order_Management.js"></script>
</head>
<main>

    <div class="container-fluid">
        <div class="page-header row">
            <h1 class="col-md-4">Order Management</h1>
            <div class="container button-wrapper cart col-md-offset-10">
                <button class="btn btn-success btn-lg"><span class="glyphicon glyphicon-shopping-cart"></span> <span class="items">1</span></button>
            </div>
            </div>
         <div>
             <div class="row menu">
                 <ul class="nav nav-tabs menu-nav col-md-12 col-sm-12 col-xs-12">
                     <li role="presentation" class="active" id="all">
                         <a href="">All orders</a>
                     </li>
                     <li role="presentation"  class="" id="payment">
                         <a href="">Waiting for payment</a>
                     </li>
                     <li role="presentation"  class="" id="comment">
                         <a href="">Waiting for comment</a>
                     </li>
                     <div class="col-md-offset-8"><p class="navbar-text">Selected Food: $0.00</p>
                         <button type="button" class="btn btn-default navbar-btn">Settlement</button>
                     </div>

                 </ul>

             </div>
             <div class="table-responsive" id="foods">
                <?php include "show.php";?>
         </div>
    </div>
</main>
