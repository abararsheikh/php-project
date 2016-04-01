<?php
//include ('dbconnect.php');

use Project\Classes\DB\DB;
include '../autoloader.php';
$db = DB::getDB();

// Email

$to = 'abrar@abrarsheikh.com';
$subject ='This come from movie server';
$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$Email = $_POST['Email'];
$Message = $_POST['Message'];

$is_body_html = true;

$body = <<<Email

From  $first_name . $last_name

$Message

Email : $Email

Email;

$headers = '$Email';
//mail($to,$from, $subject, $body, $headers,$is_body_html = false);

mail($to,$from, $subject, $body, $is_body_html);

function mail($to,$from, $subject, $body, $is_body_html = false)
{
    $smtp = array();

    // **** You must change the following to match your
    // **** SMTP server and account information.

    $smtp['host'] = 'ssl://smtp.gmail.com';
    $smtp['port'] = 465;
    $smtp['auth'] = true;
    $smtp['username'] = 'er.abrar@gmail.com';
    $smtp['password'] = 'Abrar@786';

    $mailer = Mail::factory('smtp', $smtp);

    // Add the email address to the list of all recipients
    $recipients = array();
    $recipients[] = $to;

    // Set the headers
    $headers = array();
    $headers['From'] = $from;
    $headers['To']  = $to;
    $headers['Subject'] = $subject;
    if ($is_body_html)
    {
        $headers['Content-type']  = 'text/html';
    }

    // Send the email

    $result = $mailer->send($recipients, $headers, $body);
    // Check the result and throw an error if one exists
    return $result;

}
// Now inserting form values to the database table

//$query ="INSERT INTO contactus(first_name,last_name,Email,Message) VALUES ('$first_name','$last_name','$email','$user_msg')";
$query ="INSERT INTO contactus(first_name,last_name,Email,Message) VALUES ('$first_name','$last_name','$Email','$Message')";
$db->exec($query);


//After submitting form redirect user to main page

header("location:contact.php?msg=success");

?>