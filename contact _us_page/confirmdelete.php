<body style="background-color:#CEF6D8;">
<?php

//get the 'confirmid'(hidden input name value ) from delete.php page which sent confirmid on confirm delete click
//find matching id 'confirmid' database and deletes


include 'dbconnect.php';
$contact_id = $_POST['confirmid'];
$sql = "SELECT * FROM contactus WHERE contact_id ='$contact_id'";

// Execute the sql query and get the result

$result = mysqli_query($db_connection,$sql) or die(mysqli_error($db_connection));

while($row = mysqli_fetch_array($result))
{
    $contact_id =  $row["contact_id"];
    $first_name = $row["first_name"];
    $last_name =  $row["last_name"];
    $Email = $row["Email"];
    $Message = $row["Message"];

    //show confirmation  that record has been deleted

    echo  $first_name ."   ". $last_name ."   " . $Email ."   ". $Message . "has been permanently deleted. ";

}   // End of while loop

$sql = "DELETE FROM contactus WHERE contact_id = '$contact_id'";
$result = mysqli_query($db_connection,$sql) or die(mysqli_error($db_connection));

?>

<br>
<h3>Go back to contact list page</h3>
<div>
   <a href ="displaycontact.php">  <input type="button" name="back" value="back"> </a>
</div>