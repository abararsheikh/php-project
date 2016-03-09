<?php
include ('dbconnect.php');

// Email

$to = 'abrar@abrarsheikh.com';
$subject ='This come from movie server';
$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$Email = $_POST['Email'];
$Message = $_POST['Message'];

$body = <<<Email

From  $first_name . $last_name

$Message

Email : $Email

Email;

$headers = '$Email';
mail($to, $subject, $body, $headers);



// get the values from the form

$first_name = $_REQUEST['first_name'];
$last_name = $_REQUEST['last_name'];
$email = $_REQUEST['Email'];
$user_msg = $_REQUEST['Message'];

// Now inserting form values to the database table

$query = mysqli_query($db_connection,"INSERT INTO contactus(first_name,last_name,Email,Message) VALUES ('$first_name','$last_name','$email','$user_msg')")
        or die(mysqli_error($db_connection));

//close the database conection
mysqli_close($db_connection);

//After submitting form redirect user to main page

header("location:contact.php?msg=success");