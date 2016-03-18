<body style="background-color:#CEF6D8;">
<?php
include 'dbconnect.php';

// getting thr valu from the edit fields or text boxes from editfrom.php
// $_POST['name attribute of input type']
$contact_id =  $_POST["id"];
$first_name = $_POST["firstname"];
$last_name =  $_POST["lastname"];
$Email = $_POST["email"];
$Message = $_POST["message"];

// updating databsetable with this edited fileds values

$sql = "UPDATE contactus SET
first_name = '$first_name',
last_name ='$last_name',
Email ='$Email',
Message ='$Message'
WHERE contact_id = '$contact_id' ";

$result = mysqli_query($db_connection,$sql) or die(mysqli_error($db_connection));
?>

<h1> You have made the following changes :</h1>

<p><strong>First name :</strong> <?php echo $first_name ?></p>
<p><strong>Last name :</strong> <?php echo $last_name ?></p>
<p><strong>Email :</strong> <?php echo $Email ?></p>
<p><strong>Messgae :</strong> <?php echo $Email ?></p>

<br>
<div>
   <a href ="displaycontact.php">  <input type="button" name="back" value="back"> </a>
</div>




