<?php
include '../model/db.php';
include '../model/feedback.php';
/**
 * 
 */
//Get Data
if(!isset($_POST['send'])) {
    echo 'no data';
    exit();
}

$username1 = isset( $_POST['UserName1'] ) ? trim($_POST['UserName1']) : '' ;
$phone = $_POST['Phone'];
$email = $_POST['email'];
$address = $_POST['address'];
$message = $_POST['message'];

//Valid
if (empty($username1) || empty($phone) || empty($email)|| empty($address)|| empty($message) ) {
    $error = "Invalid data. Check all fields and try again.";
}

//Main logic
$feed=new feedback();
$feed->index( $username1, $phone, $email, $address, $message );

//Render View
include '../view/Feedback.php';


