<body style="background-color:#CEF6D8;">
<?php

use Project\Classes\DB\DB;
include '../../../autoloader.php';
//$db = DB::getDB();
require_once '../../Model/Contactus.php';
$msg ='';
if( isset( $_REQUEST['msg'])) {

    $msg = $_REQUEST['msg'];

}
if(isset($_POST['submit']))
{
    $first_name = htmlspecialchars($_POST['first_name']);
    $last_name = htmlspecialchars($_POST['last_name']);
    $Email = htmlspecialchars($_POST['Email']);
    $Message =htmlspecialchars($_POST['Message']);
//===validate the input

    $validate = new Contactus();
    $error = $validate->validFname($first_name);

    $error .= $validate->validLastname($last_name);
    $error .= $validate->validEmail($Email);

// ====Validation end
    $storeUservalue = new Contactus();

    $storeUservalue ->contactProcess();

//After submitting form redirect user to main page

    header("Location:contact.php?msg=success");
}

?>
<!Doctype HTML>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../../../Assets/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="../../../Assets/css/style.css"/>
    <title>Contact US</title>
</head>


<body>
<div class="container">
<div class="row">
    <div class="col-md-12">
        <div class="well well-sm">
            <form action="#" method="post" name ="contactus" class="form-horizontal">
                <fieldset>
                    <legend class="text-center header" style="color: #36A0FF;font-size: 27px;padding: 10px;">Contact Us</legend>

                    <fieldset class="form-group">
                        <span class="col-md-1 col-md-offset-2 text-center"></span>
                        <div class="col-md-8" >
                            <span><?php  echo $error; ?></span>
                        <label  for ="fname" style ="color:#895fa9;font-size:20px;">First name:</label>
                         <input type="text" name="first_name"  value="" placeholder="FirstName" class="form-control">
                        </div>
                    </fieldset>

                    <fieldset class="form-group">
                        <span class="col-md-1 col-md-offset-2 text-center"></i></span>
                        <div class="col-md-8" >
                            <label  for ="lname" style ="color:#895fa9;font-size:20px;">Last name:</label>
                            <input type="text" name="last_name"  value="" placeholder="LastName" class="form-control">
                        </div>
                    </fieldset>

                    <fieldset class="form-group">
                        <span class="col-md-1 col-md-offset-2 text-center"></i></span>
                        <div class="col-md-8" >
                            <label  for ="email" style ="color:#895fa9;font-size:20px;">Email:</label>
                            <input type="email" name="Email"  value="" placeholder="Email" class="form-control">
                        </div>
                    </fieldset>

                    <fieldset class="form-group">
                        <span class="col-md-1 col-md-offset-2 text-center"></i></span>
                        <div class="col-md-8">
                            <label  for ="message" style ="color:#895fa9;font-size:20px;">Message:</label>
                            <textarea class="form-control" id="message" name="Message" placeholder="Enter your massage for us here. We will get back to you within 2 business days." rows="7"></textarea>
                        </div>
                    </fieldset>

                    <fieldset class="form-group">

                        <div class="col-md-12 text-center submit">
                             <input type="submit" name="submit" value="submit" class="btn btn-primary">
                        </div>
                    </fieldset>
                    <div class="col-md-12 text-center">
                    <?php
                    if($msg =='success')
                    {
                        echo "<h3 style='color: green;'>Your message has been submitted successfully.</h3>";

                    }

                    ?>
                    </div>
                </fieldset>

            </form>


        </div>
    </div>
</div>

</div>
</body>
</html>
