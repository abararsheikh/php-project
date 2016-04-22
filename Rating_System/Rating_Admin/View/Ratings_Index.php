<body style="background-color:#CEF6D8;">
<?php
use Project\Classes\DB\DB;
//include '../../../autoloader.php';
include '../../autoloader.php';
require_once '../../Model/Ratings.php';
require_once '../../database.php';
$ratingList = new Ratings();
$selectResult = $ratingList->displayRatings();
?>
<!Doctype HTML>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/Assets/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="/Assets/css/style.css"/>

    <title>List of Ratings</title>
</head>

<!--<?php //include '../../../Assets/html/header.php'?>-->
<div class="container">
    <body>
    <h2>List of Ratings</h2>

    <table class="table table-bordered">
        <thead style="color:rosybrown;font-size: 24px;">
        <tr>
            <th scope="row">Total Votes</th>
            <th>Total Ratings</th>
            <th>Used ID</th>
            <th>Date</th>
            <th>Delete</th>
            <th>Update</th>
        </tr>
        </thead>

        <?php foreach ($selectResult as $selectRating) : ?>
            <tbody>
            <tr>
                <td><?php echo $selectRating['total_votes'] ?> </td>
                <td><?php echo $selectRating['total_value'] ?> </td>
                <td><?php echo $selectRating['used_ips'] ?> </td>
                <td><?php echo $selectRating['date'] ?> </td>

                <td>
                    <form method ="post" action ="../controller/delete_rating.php">
                        <input type ="hidden" name = "rating_id" value="<?php echo $selectRating['rating_id'] ?>">
                        <input type ="submit" name = "delete" value ="Delete">
                    </form>
                </td>
                <td>
                    <form method ="post" action ="edit_rating_form.php">
                        <input type ="hidden" name = "rating_id" value="<?php echo $selectRating['rating_id'] ?>"/>
                        <input type ="submit" name = "update" value ="Edit">
                    </form>
                </td>

            </tr>
            </tbody>

        <?php endforeach; ?>
    </table>

    </body>
</div>

</html>
