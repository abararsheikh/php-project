<body style="background-color:#CEF6D8;">
<?php

//get the 'confirmid'(hidden input name value ) from delete.php page which sent confirmid on confirm delete click
//find matching id 'confirmid' database and deletes
use Project\Classes\DB\DB;
include '../autoloader.php';
$db = DB::getDB();

//include 'dbconnect.php';
$contact_id = $_POST['confirmid'];
$sql = "SELECT * FROM contactus WHERE contact_id ='$contact_id'";

// Execute the sql query and get the result

$delQuery = $db->prepare($sql);
$delQuery->execute();
$result = $delQuery->fetch();

$contact_id = $result['contact_id'];
$first_name = $result['first_name'];
$last_name = $result['last_name'];
$Email = $result['Email'];
$Message = $result['Message'];

    //show confirmation  that record has been deleted
echo "<div class=\"container\">" ;
echo  "<h3>" . $first_name ." <br/>  ". $last_name ." </br>  " . $Email ." </br>  ". $Message ." <br/>" ."<h2 style ='color:green;'>"."   Has been permanently deleted.!!! "."</h2>". "</h3>";
echo "</div>";



$sql = "DELETE FROM contactus WHERE contact_id = '$contact_id'";
$db->exec($sql);

?>
<!Doctype HTML>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../Assets/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="../Assets/css/style.css"/>

    <title>List of contacts</title>
</head>


<div class="container">
    <body>
        <br>
        <h3>Go back to contact list page</h3>
        <div>
           <a href ="displaycontact.php">  <input type="button" name="back" value="back"  class="btn btn-primary"> </a>
        </div>
    </body>
</div>
</html>