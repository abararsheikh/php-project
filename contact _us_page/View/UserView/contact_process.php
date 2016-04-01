<?php
//include ('dbconnect.php');

use Project\Classes\DB\DB;
include '../../../autoloader.php';
require_once '../../Model/Contactus.php';

$db = DB::getDB();

// Email

$to = 'abrar@abrarsheikh.com';
$subject ='This come from movie server';
$first_name = htmlspecialchars($_POST['first_name']);
$last_name = htmlspecialchars($_POST['last_name']);
$Email = htmlspecialchars($_POST['Email']);
$Message =htmlspecialchars($_POST['Message']);



$is_body_html = false;

$body = <<<Email

From  $first_name . $last_name

$Message

Email : $Email

Email;

$headers = '$Email';
//mail($to,$from, $subject, $body, $headers,$is_body_html = false);


mail($to,$from, $subject, $body, $is_body_html);

$storeUservalue = new Contactus();

$storeUservalue ->contactProcess();

//After submitting form redirect user to main page

header("Location:contact.php?msg=success");

exit;
?>