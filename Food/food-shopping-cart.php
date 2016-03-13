<?php

?>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <link href="../Assets/css/bootstrap.min.css" rel="stylesheet" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="../Assets/js/jquery.min.js" ></script>
    <script src="../Assets/js/bootstrap.min.js" ></script>
    <link rel="stylesheet" type="text/css" href="../Assets/css/food-shopping-cart.css" />
    <script src="../Assets/js/food_shopping_cart.js"></script>
</head>
<main>
    <div class="container-fluid">
        <div class="page-header row">
          <h1 class="col-md-4">Food Shopping Cart</h1>
            <div class="col-md-offset-5 col-md-3">
                <form action="" class="search-form ">
                <div class="form-group has-feedback">
                    <label for="search" class="sr-only">Search</label>
                    <input type="text" class="form-control" name="search" id="search" placeholder="search">
                    <span class="glyphicon glyphicon-search form-control-feedback"></span>
                </div>
            </form>
                </div>
            </div>
        <div class="row menu">
    <ul class="nav nav-tabs menu-nav col-md-12 col-sm-12 col-xs-12">
        <li role="presentation" class="active"><a href="#">All Items</a></li>
        <li role="presentation"><a href="#">Profile</a></li>
        <li role="presentation"><a href="#">Messages</a></li>
    </ul>
            </div>
        <div class="table-responsive">
            <table class="table table-hover">
                <thead><td><input type="checkbox" class="check"></td><td>Select all</td><td colspan="2">Food information</td><td>Price(CAD)</td><td>Quantity</td><td>Amount</td><td>Operation</td></thead>
                <tr>
                  <td rowspan="4"><input type="checkbox" class="check"/> </td>
                    <td rowspan="4"><a href="#"><img src="../Assets/image/food/food1.jpg" width="130" height="95"/></a></td><td rowspan="4">Good food</td><td rowspan="4">Catatory:</td>
                    <td rowspan="4">1.80</td>


                    <td rowspan="4">
                       <div class="snip"><input type="button" value="-" /><input type="text" size="1" maxlength="3"/><input type="button" value="+"/></div>
                    </td><td rowspan="4">10.00</td><td rowspan="4"><a htef="" id="delete">Delete</a></td>
                </tr>
<tr></tr>
                <tr></tr>
                <tr></tr>
                <tr>
                    <td rowspan="4"><input type="checkbox" class="check"/> </td>
                    <td rowspan="4"><a href="#"><img src="../Assets/image/food/food1.jpg" width="130" height="95" /></a></td><td rowspan="4">Good food</td><td rowspan="4">Catatory:</td>
                    <td rowspan="4">1.80</td>


                    <td rowspan="4">
                        <div class="snip"><input type="button" value="-" /><input type="text" size="1" maxlength="3"/><input type="button" value="+"/></div>
                    </td><td rowspan="4">10.00</td><td rowspan="4"><a htef="" id="delete">Delete</a></td>
                </tr>
            </table>
        </div>
    </div>
</main>
</html>
