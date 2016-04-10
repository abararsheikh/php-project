<?php
include("database.php");
//$ids=array(1,2);  //define  quantity of movies in array and it's display rating system for that
$query = "SELECT moviefeature.film_id FROM ratings INNER JOIN moviefeature ON ratings.film_id = moviefeature.film_id ";
$queryPre = $db ->prepare($query);
$fIds = $queryPre->execute();
$fIds = $queryPre->fetch(PDO::FETCH_ASSOC);
$ids =array();
$ids[] = $fIds['film_id'];
var_dump($ids);
?>

<html>
<head>
    <meta charset="UTF-8">
    <title>Rate Movie</title>
    <script src="jquery.js" type="text/javascript"></script>
    <link rel="stylesheet" href="rating.css" />
    <script type="text/javascript" src="rating.js"></script>
</head>
<body>

<?php
for($i=0;$i<count($ids);$i++)
{
    //$rating_tableName = 'ratings';
    $id=$ids[$i];
    $query = "SELECT total_votes, total_value FROM ratings WHERE rating_id = $id";
    $queryPre = $db ->prepare($query);
    $result = $queryPre->execute();
    //  $result = $queryPre->fetch();
    $row = $queryPre->fetch(PDO::FETCH_ASSOC);

    if(!$row)
    {
        echo "<span style='color: red;'> Error! No record found in database!! </span>";
    }
    /*
    while($row = $queryPre->fetch())
    {

        $v = $row['total_votes'];
        $tv = $row['total_value'];
        $rat = $tv/$v;
        var_dump($rat);
    }
*/
    $v = $row['total_votes'];
    $tv = $row['total_value'];
    $rat = $tv/$v;      // var_dump(@number_format($rat));  convert array to value using number_formate and display to user

    $j =$i+1;

    $id = $ids[$i];
    echo'<div class="product">
           Rate Item '.$j.'
            <div id="rating_'.$id.'" class="ratings">';
    for($k=1;$k<6;$k++)
    {
        if($rat+0.5>$k)
        {
            //Adding rating star style class with image ratingVoted
            $class="star_".$k."  ratings_stars ratings_vote";
        }
        else{
            //Add ratings_stars for image size and then display ratings_blank image
            $class="star_".$k." ratings_stars ratings_blank";
        }
        echo '<div class="'.$class.'"></div>';
    }
    echo' <div class="total_votes"><p class="voted"> Rating: <strong>'.@number_format($rat).'</strong>/5 ('.$v. '  vote(s) cast)
            </div>
        </div></div>';}
?>


</body>
</html>