<body style="background-color:#CEF6D8;">
<?php
//include 'dbconnect.php';

//connect to database :
use Project\Classes\DB\DB;
include '../autoloader.php';
$db = DB::getDB();

// getting the value from the edit fields or text boxes from editfrom.php
// $_POST['name attribute of input type']
$contact_id =  $_POST["id"];
$first_name = $_POST["firstname"];
$last_name =  $_POST["lastname"];
$Email = $_POST["email"];
$Message = $_POST["message"];

if(empty($first_name) || empty($first_name) || empty($Email) || empty($Message))
{
   echo "<h3 style='color:red'>" . "Invalid Contact details . Check all fields and try again." . "</h3>";
}
else
{

// updating database table with this edited fields values

$sql = "UPDATE contactus SET
first_name = '$first_name',
last_name ='$last_name',
Email ='$Email',
Message ='$Message'
WHERE contact_id = '$contact_id' ";

//$result = mysqli_query($db_connection,$sql) or die(mysqli_error($db_connection));
//Execute the Query
$updateStatment = $db->prepare($sql);
$updateStatment->execute();
}
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
<boby>

<div class="container">
<h1> You have made the following changes :</h1>

<p><strong>First name :</strong> <?php echo $first_name ?></p>
<p><strong>Last name :</strong> <?php echo $last_name ?></p>
<p><strong>Email :</strong> <?php echo $Email ?></p>
<p><strong>Messgae :</strong> <?php echo $Message ?></p>

<br>
<div>
   <a href ="displaycontact.php">  <input type="button" name="back" value="Back To Index" class="btn btn-primary"> </a>
</div>

</div>
</boby>
</html>


