<?php

?>


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
        <li role="presentation" class="<?php if($page=="cart_list") echo "active";?>" onclick="Item()"><a href="index.php">All Items</a></li>
        <li role="presentation"  class="<?php if($page=="instock") echo "active";?>" onclick="Instock()"><a href="?page=instock">Low stock</a></li>
        <li role="presentation"  class="<?php if($page=="price") echo "active";?>" onclick="Price()"><a href="?page=price">Price reduction</a></li>
        <div class="col-md-offset-8"><p class="navbar-text">Selected Food: $0.00</p>
            <button type="button" class="btn btn-default navbar-btn">Settlement</button>
        </div>

    </ul>

            </div>
        <div class="table-responsive" id="foods">
            <table class="table table-hover">
                <thead><td><input type="checkbox" class="check" id="checkall"></td><td>Select all</td><td colspan="2">Food information</td><td>Price(CAD)</td><td>Quantity</td><td>Amount</td><td>Operation</td></thead>
                <tr>
                  <td rowspan="4"><input type="checkbox" class="check"/> </td>
                    <td rowspan="4"><a href="#"><img src="../../Assets/image/food/food1.jpg" width="130" height="95"/></a></td><td rowspan="4">Good food</td><td rowspan="4">Catatory:</td>
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
                    <td rowspan="4"><a href="#"><img src="../../Assets/image/food/food1.jpg" width="130" height="95" /></a></td><td rowspan="4">Good food</td><td rowspan="4">Catatory:</td>
                    <td rowspan="4">1.80</td>


                    <td rowspan="4">
                        <div class="snip"><input type="button" value="-" /><input type="text" size="1" maxlength="3"/><input type="button" value="+"/></div>
                    </td><td rowspan="4">10.00</td><td rowspan="4"><a htef="" id="delete">Delete</a></td>
                </tr>
            </table>
        </div>
        <div class="row">
            <nav>
                <ul class="pager">
                    <li class="disabled"><a href="#">Previous</a></li>
                    <li><a href="#">Next</a></li>
                </ul>
            </nav>

        </div>
        <div></div>
    </div>
</main>

