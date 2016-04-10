<?php
// disable the catch from the client browser
header("Cache-Control: no-cache");
include('database.php');

//getting id of movie-1,2,3 which one is click that id from the rating.js page of new class id attribute
$id_sent = preg_replace("/[^0-9]/","",$_REQUEST['id']);
var_dump($id_sent);
//Take the value of star based on user select Ex-user select 1-5 star take that value
$vote_sent = preg_replace("/[^0-9]/","",$_REQUEST['stars']);


// Get The IP address of the local server host machine.
$ip =$_SERVER['REMOTE_ADDR'] ;
//$ip= gethostbyaddr($_SERVER['REMOTE_ADDR']); // store the remote server hostname

//================This will work on server==
/*
function get_client_ip_server() {
    $ip = '';
    if ($_SERVER['HTTP_CLIENT_IP'])
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    else if($_SERVER['HTTP_X_FORWARDED_FOR'])
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    else if($_SERVER['HTTP_X_FORWARDED'])
        $ip = $_SERVER['HTTP_X_FORWARDED'];
    else if($_SERVER['HTTP_FORWARDED_FOR'])
        $ip = $_SERVER['HTTP_FORWARDED_FOR'];
    else if($_SERVER['HTTP_FORWARDED'])
        $ip = $_SERVER['HTTP_FORWARDED'];
    else if($_SERVER['REMOTE_ADDR'])
        $ip = $_SERVER['REMOTE_ADDR'];
    else
        $ip = 'UNKNOWN';

    return $ip;
}
$ip = get_client_ip_server();
var_dump($ip);
*/
//==============
$selectStatment = "SELECT rating_id FROM ratings WHERE rating_id ='$id_sent'";
$q = $db->prepare($selectStatment);

$query = $q->execute();
//var_dump($q->fetch());
//Take the id of the movie and compare that id with databse id if it's already exist
//then don't allow user to add the same id to database and if not exist then add to database
if(empty($q->fetch()))
{

    $addQuery = "insert into ratings (rating_id,date) values ('$id_sent',curdate())";
    $addStatment = $db->prepare($addQuery);
    $addStatment ->execute();

}


// kill the script
if ($vote_sent > $units)
{
    die("Sorry, vote appears to be invalid.");
}

//connecting to the database to get some information
// total_votes means how many peoples have voted this movies and total_value how much they have rated grab that value from database
$stm = "SELECT total_votes, total_value, used_ips FROM $rating_dbname.$rating_tableName WHERE rating_id='$id_sent' " or (die("error"));
$query= $db->prepare($stm);
$query->execute();

//$numbers = $db->fetch(PDO::FETCH_ASSOC);

$numbers  = $query->fetch(PDO::FETCH_ASSOC);

//var_dump($numbers);
//unserialize() takes a single serialized variable and converts it back into a PHP value.
$checkIP = unserialize($numbers['used_ips']);

$count = $numbers['total_votes'];   //Grab total votes from database column
$current_rating = $numbers['total_value'];  //total number of rating added together and stored
$sum = $vote_sent+$current_rating;      // add together the current vote value and the total vote value

$tense = ($count==1) ? "vote" : "votes";    //plural form votes/vote

// checking to see if the first vote has been tallied
// or increment the current number of votes
($sum==0 ? $added=0 : $added=$count+1);

// if it is an array i.e. already has entries the push in another value

((is_array($checkIP)) ? array_push($checkIP,$ip) : $checkIP=array($ip));
$insertip=serialize($checkIP);  //it serialize IP to {i:0;s:9:"127.0.0.1} this formate


//IP check when voting if there is no cookie then create the cookie
if(!isset($_COOKIE['rating_'.$id_sent])) //concatenating rating_ with whichever user select movie from list
{
    $query = "SELECT used_ips FROM ratings WHERE used_ips LIKE '%".$ip."%' AND rating_id =' ".$id_sent."' ";
    $votedIP = $db->prepare($query);
    $voted = $votedIP->execute();
    $voted= $votedIP->fetch();

}
else
{
    $voted=1;
}

if(!$voted) {     //if the user hasn't yet voted, then vote normally...

    if (($vote_sent >= 1 && $vote_sent <= $units))  // keep votes within range, make sure IP matches
    {

        $updateQuery = "UPDATE ratings SET total_votes='".$added."', total_value='".$sum."', used_ips='".$insertip."' WHERE rating_id='$id_sent'";
        $update = $db->prepare($updateQuery);
        $result = $update->execute();

        if($result)
        {
            setcookie("rating_".$id_sent,1, time()+ 2592000);
        }
    }
} //end for the "if(!$voted)"

// these are new queries to get the new values!


$q = $db->prepare("SELECT total_votes, total_value, used_ips FROM $rating_tableName WHERE rating_id='$id_sent' ")or die(" Error: ");
//$numbers = mysql_fetch_assoc($newtotals);
$newtotals = $q->execute();
$numbers = $q->fetch(PDO::FETCH_ASSOC);

//$numbers = mysql_fetch_assoc($newtotals);
$count = $numbers['total_votes'];  //how many votes total
$current_rating = $numbers['total_value'];  //total number of rating added together and stored
$tense = ($count==1) ? "vote" : "votes";  //plural form votes/vote

// $new_back is what gets 'drawn' on your page after a successful 'AJAX/Javascript' vote

if($voted)
{
    $sum = $current_rating; //storing total_value from database to new varibale
    $added = $count; //storing total_votes from database to new varibale
}

$new_back = array();

for($i=0;$i<5;$i++)
{
    $j = $i + 1;

    if ($i < @number_format($current_rating / $count, 1) - 0.5)
    {
        $class = "ratings_stars ratings_vote";

    }
    else {
        $class = "ratings_stars";
    }

    $new_back[] .= '<div class="star_' . $j . ' ' . $class . '"></div>';

}

$new_back[] .= ' <div class="total_votes"><p class="voted"> Rating: <strong>'.@number_format($sum/$added,1).'</strong>/'.$units.' ('.$count.' '.$tense.' cast) ';

if(!$voted)
{
    $new_back[] .= '<span class="thanks">Thanks for voting!</span></p>';
}

else
{
    $new_back[] .= '<span class="invalid">Already voted for this item</span></p></div>';
}
$newResult = join("\n", $new_back);

// ========================


$output = $newResult;
echo $output;

?>