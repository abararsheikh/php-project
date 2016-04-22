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
    <link rel="stylesheet" type="text/css" href="../../Assets/css/font-awesome.min.css" />
    <link rel="stylesheet" type="text/css" href="../../Assets/css/food-comment.css" />
    <script type="text/javascript" src="../../Assets/js/Food/food_comment.js"></script>
</head>
<body>
<?php include "../../Assets/html/header.php";?>
<main>
<div class="container-fluid">
    <div class="page-header">
<h2>Food Comment</h2>
    </div>
    <div class="row">
<div href="#" class="thumbnail image col-md-4 col-sm-6 col-xs-12">

    <img src="../../Assets/image/food/<?php echo $food->getImage();?>" class="img-rounded" alt="..." class="">
</div>
        <div class="col-md-8 col-sm-6 col-xs-12">
            <h3 style="margin-top:10px;"><?php echo $food->getName();?></h3>
    <form>

        <div class="form-group ">
     <label class="score">Score:</label>
<div>
<span class="con">Lowest 1</span>
        <div class="rating">

    <span class="star" id="1">&#9734</span>
    <span  class="star" id="2">&#9734</span>
    <span  class="star" id="3">&#9734</span>
    <span  class="star" id="4">&#9734</span>
    <span  class="star" id="5">&#9734</span>

</div>

            <span class="con">5 Highest</span>
</div>
</div>
        <div class="form-group">
            <label>Assessment:</label>
            <div>
            <input type="radio" name="satisfaction" value="good"/>   <label for="good">Satisfied</label>
            <input type="radio" name="satisfaction" value="soso"/> <label for="soso">Common</label>
            <input type="radio" name="satisfaction" value="bad"/><label for="bad"> Not satisfied</label>
</div>
        </div>
        <div class="form-group cf">
            <label for="comment"> Comment: </label> <textarea class="form-control" rows="5"  name="comment">

            </textarea>
        </div>
        <div class="form-group image-upload">


                <label for="file-input">
                    <i class="fa fa-picture-o fa-2x" aria-hidden="true"></i>
                </label>

                <input id="file-input" type="file" name="file"/>

            </div>
        <div class="form-group">
            <input type="hidden" value="<?php echo $_GET["orderitemid"];?>" name="orderitemid"/>
            <input type="hidden" value="<?php echo $food->getId();?>" name="foodid"/>
            <input type="hidden" value="insertcomment" name="action"/>

        <button type="submit" class="btn" name="submit">Submit</button>
            <div>
    </form>
    </div>
    </div>
    <div>
</main>
        <?php include "../../Assets/html/footer.php";?>
</body>
</html>
