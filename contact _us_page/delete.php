<body style="background-color:#CEF6D8;">
<?php
//include 'dbconnect.php';
//connect to database

use Project\Classes\DB\DB;
include '../autoloader.php';
$db = DB::getDB();

$sel_record = $_POST['sel_record'];

//SQL  statment to select information based on delete button click

$sql = "SELECT *  FROM contactus WHERE contact_id = $sel_record";

// Execute the sql query and get the result

//$result = mysqli_query($db_connection,$sql) or die(mysqli_error($db_connection));
$delQuery = $db->prepare($sql);
$delQuery->execute();
$result = $delQuery->fetch();

$contact_id = $result['contact_id'];
$first_name = $result['first_name'];
$last_name = $result['last_name'];
$Email = $result['Email'];
$Message = $result['Message'];
?>

<!Doctype HTML>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../Assets/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="../Assets/css/style.css"/>

    <title>Delete contacts</title>
</head>
<body>

<div class="container">
<h2>Are you sure you want to delete this record !! ? </h2>

<ul>
<li>Contact Id : <?php echo $contact_id ?> </li>
<li> Firstname: <?php echo $first_name ?> </li>
<li> Lastname: <?php echo $last_name ?></li>
<li>Email : <a href="mailto:$Email"> <?php echo $Email ?> </a></li>
<li> Message : <?php echo $Message ?> </li>
</ul>
<p>
<br/>

<form action='confirmdelete.php' method='post'>
<input type='hidden' name='confirmid' value='<?php echo $contact_id ?> '>
<input type='submit' name ='confirmdelete' value='confirm delete'  class="btn btn-primary"/>
<input type ='button' name='cancel' value ='cancel' onclick= ' location.href ="displaycontact.php" '  class="btn btn-primary"/>

</form>


</p>
</div>
</body>
</html>


