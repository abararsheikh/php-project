<?php
?>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <link href="../../Assets/css./bootstrap.min.css" rel="stylesheet" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="../../Assets/js/jquery.min.js" ></script>
    <script src="../../Assets/js/bootstrap.min.js" ></script>
    <link rel="stylesheet" type="text/css" href="../../Assets/css/food_product.css" />
    <script src="../../Assets/js/food_product.js"></script>
</head>
<main>
    <div class="container-fluid">
        <div class="page-header row">
            <div class="btn-group col-md-2 col-md-offset-8">
                <button type="button" class="btn btn-info dropdown-toggle order" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Order Management <span class="glyphicon glyphicon-triangle-bottom"></span>
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Action</a></li>
                </ul>
            </div>
            <div class="container button-wrapper cart col-md-2">
                <button class="btn btn-success btn-lg"><span class="glyphicon glyphicon-shopping-cart"></span> <span class="items">1</span></button>
            </div>
            </div>
        <div class="table-responsive">
            <table class="table1">
               <tr> <td rowspan="6" colspan="1" width="400"><img class="thumbnail" src="../../Assets/image/food/food1.jpg" width="340" height="220"/><div style="margin-top: 20px;"><label>Share:</label></div></td><td colspan="7"><h3>Good food</h3></td></tr>
                <tr><td height="60"><label>Deal record:</label>100</td><td colspan="2"></td> <td><label>Accumulated comment:</label> 100</td><td colspan="3"></td></tr>
                <tr><td colspan="7" height="60"><label>Price:</label> 1.00 ( CAD ) </td></tr>
                <tr><td colspan="7" height="60"><label>Original Price:</label> $2.00 <label>Save:</label> $1.00 </td></tr>
                <tr><td colspan="7" height="60"><label>From</label> 1 <label>To</label> 2</td></tr>
                <tr><td colspan="1" height="60"><label for="size">Size: </label></td><td colspan="6">
                     Small   <input type="radio" name="size"/>
                      Middle  <input type="radio" name="size"/>
                     Large   <input type="radio" name="size"/>
                    </td></tr>

                <tr><td colspan="1" height="60"></td><td colspan="1">
                       <label for="quantity">Quantity: </label>

                    </td>
                    <td colspan="2"><div class="snip"><input type="button" value="-" /><input type="text" size="1" maxlength="3"/><input type="button" value="+"/></div></td>
                    <td colspan="4">( Instock: 100 )</td></tr>
                <tr><td colspan="1" height="60"></td><td colspan="1"><button class="btn bb">Buy now</button></td> <td colspan="6"><button class="btn bb">Add to cart</button></td></tr>
                </table>
        </div>
       <div style="height:0;border-top:2px solid orange;margin-top:30px"></div>
        <div class="container">

            <h3>Accumulated comment</h3>
            <div>
           <label for="comment_show">Food product mark: </label>
            <input type="radio" name="comment_show"/>All
            <input type="radio" name="comment_show"/>Good(100)
            <input type="radio" name="comment_show"/>So-so(100)
            <input type="radio" name="comment_show"/>Bad(100)
            </div>
            <div class="row" style="border-bottom: solid 1px grey;margin-bottom: 20px;padding-bottom:20px;">
                <div class="col-md-6 col-sm-8">
<p>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
                    <div>01.20</div>
                </div>
                <div class="col-md-2 col-sm-2"><p>Size:</p></div>
                <div class="col-md-2 col-sm-2">Username</div>
            </div>
            <div class="row" style="border-bottom: solid 1px grey;margin-bottom: 20px;padding-bottom:20px;">
                <div class="col-md-6 col-sm-8">
                    <p>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
                    <div>01.20</div>
                </div>
                <div class="col-md-2 col-sm-2"><p>Size:</p></div>
                <div class="col-md-2 col-sm-2">Username</div>
            </div>
        </div>
        </div>
</main>
