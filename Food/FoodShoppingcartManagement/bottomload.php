<?php foreach($foods as $item){ ?>

    <div class="col-xs-10 col-sm-4 col-md-2">
        <div href="#" class="thumbnail">
            <img src="../../Assets/image/food/<?php echo $item->getImage();?>" alt="..." class="">
            <div class="caption">
                <h3 class="food_title"><?php echo $item->getName();?></h3>
                <button type="button" class="btn btn-default btn-sm view">View Detail</button>
            </div>
        </div>

    </div>

<?php } ?>
