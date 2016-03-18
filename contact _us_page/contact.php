<body style="background-color:#CEF6D8;">
<?php
include('dbconnect.php');

$msg ='';
if( isset( $_REQUEST['msg'])) {

    $msg = $_REQUEST['msg'];

}


?>

<html>
<head>
    <title> welcome to contact us page</title>
</head>
<body>

<form action="contact_process.php" method="post" name ="contactus">
    <div>
        Firstname : <input type="text" name="first_name"  value="">
    </div>
    <div>
        Lastname : <input type="text" name="last_name" value="">
    </div>
    <div>
        Email : <input type="email" name="Email" value="">
    </div>
    <div>
        Message : <textarea id = "message" name="Message">
            </textarea>
    </div>
    <div>
         <input type="submit"  value="submit">
    </div>
</form>

<?php
if($msg =='success')
{
    echo "<h3 style='color: green;'>Your message has been submitted successfully.</h3>";
}
?>
</body>
</html>
