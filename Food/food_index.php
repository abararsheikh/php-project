<?php
?>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <link href="../Assets/css/bootstrap.min.css" rel="stylesheet" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="../Assets/js/jquery.min.js" ></script>
    <script src="../Assets/js/bootstrap.min.js" ></script>
    <link rel="stylesheet" type="text/css" href="../Assets/css/food-index.css" />
</head>
<main>
    <div class="container-fluid">
        <div class="page-header row">
            <h1 class="col-md-3">Food Menu</h1>
            <div class="col-md-3 col-md-offset-3">
            <form action="" class="search-form ">
                <div class="form-group has-feedback">
                    <label for="search" class="sr-only">Search</label>
                    <input type="text" class="form-control" name="search" id="search" placeholder="search">
                    <span class="glyphicon glyphicon-search form-control-feedback"></span>
                </div>
            </form>
                </div>
            <div class="btn-group col-md-2 ">
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

            <div class="container button-wrapper cart col-md-1">
                <button class="btn btn-success btn-lg"><span class="glyphicon glyphicon-shopping-cart"></span> <span class="items">1</span></button>
            </div>

        </div>


        <!--<div class="container">
            <button class="navbar-toggle" data-toggle="collapse" data-target=".navHeaderCollapse">
                <span class="icon-bar" style="background-color: #0A0A0A"></span>
                <span class="icon-bar" style="background-color: #0A0A0A"></span>
                <span class="icon-bar" style="background-color: #0A0A0A"></span>
            </button>
            <div class="collapse navbar-collapse navHeaderCollapse">
                    <ul class="nav nav-pills nav-stacked ">
                        <li class="active"><a href="#">Home</a></li>
                        <li><a href="#">Profile</a></li>
                        <li><a href="#">Messages</a></li>
                    </ul>
            </div>
        </div>--><div class="sidebar-nav col-xs-12 col-sm-3 col-md-3  ">
            <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#MainMenu">
                <span class="sr-only" style="background-color:crimson">Toggle navigation</span>
                <span class="icon-bar" style="background-color: #0A0A0A"></span>
                <span class="icon-bar" style="background-color: #0A0A0A"></span>
                <span class="icon-bar" style="background-color: #0A0A0A"></span>
            </button>
                </div>
          <!--  <div class=" collapse navbar-collapse ctlist sidebar-navbar-collapse">
                <ul class="nav nav-pills nav-stacked">
                    <li class="active"><a href="#">Home</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li><a href="#">Action</a></li>
                            <li><a href="#">Another action</a></li>
                            <li><a href="#">Something else here</a></li>
                            <li class="divider"></li>
                            <li class="dropdown-header">Nav header</li>
                            <li><a href="#">Separated link</a></li>
                            <li><a href="#">One more separated link</a></li>
                        </ul>
                    </li>
                    <li><a href="#">Profile</a></li>
                    <li><a href="#">Messages</a></li>
                </ul>
            </div>-->
            <div id="MainMenu" class="collapse navbar-collapse ctlist">
                <div class="list-group panel">
                    <a href="#demo3" class="list-group-item list-group-item-success" data-toggle="collapse" data-parent="#MainMenu">Item 3</a>
                    <div class="collapse" id="demo3">
                        <a href="javascript:;" class="list-group-item">Subitem 1</a>
                        <a href="javascript:;" class="list-group-item">Subitem 2</a>
                        <a href="javascript:;" class="list-group-item">Subitem 3</a>
                    </div>
                    <a href="#demo4" class="list-group-item list-group-item-success" data-toggle="collapse" data-parent="#MainMenu">Item 4</a>
                    <div class="collapse" id="demo4">
                        <a href="" class="list-group-item">Subitem 1</a>
                        <a href="" class="list-group-item">Subitem 2</a>
                        <a href="" class="list-group-item">Subitem 3</a>
                    </div>
                    <a href="#demo5" class="list-group-item list-group-item-success" data-toggle="collapse" data-parent="#MainMenu">Item 4</a>
                    <div class="collapse" id="demo5">
                        <a href="" class="list-group-item">Subitem 1</a>
                        <a href="" class="list-group-item">Subitem 2</a>
                        <a href="" class="list-group-item">Subitem 3</a>
                    </div>
                    <a href="#demo6" class="list-group-item list-group-item-success" data-toggle="collapse" data-parent="#MainMenu">Item 4</a>
                    <div class="collapse" id="demo6">
                        <a href="" class="list-group-item">Subitem 1</a>
                        <a href="" class="list-group-item">Subitem 2</a>
                        <a href="" class="list-group-item">Subitem 3</a>
                    </div>
                </div>
            </div>
         <div id="rate"><h3>Top Food</h3>
             <div class=" image">
                 <div class="image2 img-rounded">
                     <img src="../Assets/image/food/food1.jpg" class="img-responsive img-rounded" width="220" height="150"/>
                 </div>
             </div>
             <div class=" image">
                 <div class="image2 img-rounded">
                     <img src="../Assets/image/food/food1.jpg" class="img-responsive img-rounded" width="220" height="150"/>
                 </div>
             </div>
             <div class=" image">
                 <div class="image2 img-rounded">
                     <img src="../Assets/image/food/food1.jpg" class="img-responsive img-rounded" width="220" height="150"/>
                 </div>
             </div>
             <div class="line"></div>
         </div>
</div>
        <div class="menu col-xs-12  col-sm-9 col-md-9 row">


            <div class="col-sm-6 col-md-4  image">
                <div class="image1 img-rounded">
                    <img src="../Assets/image/food/food1.jpg" class="img-responsive img-rounded" width="280" height="187"/>
                </div>
            </div>
            <div class="col-sm-6 col-md-4  image">
                <div class="image1 img-rounded">
                <img src="../Assets/image/food/food2.jpg" class="img-responsive img-rounded" width="280" height="220"/>
</div>
            </div>
            <div class="col-sm-6 col-md-4  image">
                <div class="image1 img-rounded">
                <img src="../Assets/image/food/food3.jpg"  class="img-responsive img-rounded" width="280" height="220"/>
</div>
            </div>
            <div class="col-sm-6 col-md-4  image">
                <div class="image1 img-rounded">
                <img src="../Assets/image/food/food4.jpg"  class="img-responsive img-rounded" width="280" height="220"/>
</div>
            </div>



        <div class="col-sm-6 col-md-4  image">
            <div class="image1 img-rounded">
            <img src="../Assets/image/food/food4.jpg"  class="img-responsive img-rounded" width="280" height="220"/>
            </div>
            </div>
                <div class="col-sm-6 col-md-4  image">
                    <div class="image1 img-rounded">
                    <img src="../Assets/image/food/food4.jpg"  class="img-responsive img-rounded" width="280" height="220"/>
                </div>
                    </div>
            </div>
    </div>

    </div>
</main>
