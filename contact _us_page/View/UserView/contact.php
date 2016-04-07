<body style="background-color:#CEF6D8;">
<?php
require_once 'Mail.php';
use Project\Classes\DB\DB;
include '../../../autoloader.php';
//$db = DB::getDB();
require_once '../../Model/Contactus.php';

if(isset($_POST['submit']))
{
    $first_name = htmlspecialchars($_POST['first_name']);
    $last_name = htmlspecialchars($_POST['last_name']);
    $Email = htmlspecialchars($_POST['Email']);
    $Message =htmlspecialchars($_POST['Message']);
    $Message = trim($Message);
//===validate the input=========

    $validate = new Contactus();
    $error = $validate->validFname($first_name);

    $error .= $validate->validLastname($last_name);
    $error .= $validate->validEmail($Email);
    $error .= $validate->validMessagebox($Message);

// ====Validation End here=====

 //==================Email FUnction================
    $sendEmail = new Contactus();

    //$to = 'abrar@abrarsheikh.com';
    $to = 'er.abrar@gmail.com';
    $subject ='This come from movie server';
    $is_body_html = true;

    $body = "From".$first_name . $last_name . $Message;

    $from ="From my server";


    $headers = '$Email';
//mail($to,$from, $subject, $body, $headers,$is_body_html = false);

  // echo $sendEmail->mail($to,$from, $subject, $body, $is_body_html);


 //==================End Email FUnction================
//After submitting form redirect user to main page
if(empty($error))
{
    $success = "Your message has been submitted successfully.";
    //header("Location:contact.php?msg=success");

    $storeUservalue = new Contactus();

    $storeUservalue ->contactProcess();
}

}

?>
<!Doctype HTML>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/Assets/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="/Assets/css/style.css"/>
    <title>Contact US</title>
</head>


<body>
<div class="container">
<div class="row">
    <div class="col-md-12">
        <div class="well well-sm">
            <form action="" method="post" name ="contactus" class="form-horizontal">
                <fieldset>
                    <legend class="text-center header" style="color: #36A0FF;font-size: 27px;padding: 10px;">Contact Us</legend>

                    <fieldset class="form-group">
                        <span class="col-md-1 col-md-offset-2 text-center"></span>
                        <div class="col-md-8" >
                            <span><?php if(isset($error)) echo $error; ?></span>
                        <label  for ="fname" style ="color:#895fa9;font-size:20px;">First name:</label>
                         <input type="text" name="first_name"  value="<?php if(isset($_POST['first_name'])) echo $first_name; ?>" placeholder="FirstName" class="form-control">
                        </div>
                    </fieldset>

                    <fieldset class="form-group">
                        <span class="col-md-1 col-md-offset-2 text-center"></i></span>
                        <div class="col-md-8" >
                            <label  for ="lname" style ="color:#895fa9;font-size:20px;">Last name:</label>
                            <input type="text" name="last_name"  value="<?php if(isset($_POST['last_name'])) echo $last_name; ?>" placeholder="LastName" class="form-control">
                        </div>
                    </fieldset>

                    <fieldset class="form-group">
                        <span class="col-md-1 col-md-offset-2 text-center"></i></span>
                        <div class="col-md-8" >
                            <label  for ="email" style ="color:#895fa9;font-size:20px;">Email:</label>
                            <input type="email" name="Email"  value="<?php if(isset($_POST['Email'])) echo $Email; ?>" placeholder="Email" class="form-control">
                        </div>
                    </fieldset>

                    <fieldset class="form-group">
                        <span class="col-md-1 col-md-offset-2 text-center"></i></span>
                        <div class="col-md-8">
                            <label  for ="message" style ="color:#895fa9;font-size:20px;">Message:</label>
                            <textarea class="form-control" id="message" name="Message"  placeholder="Enter your massage for us here. We will get back to you within 2 business days." rows="7">
                                <?php if(isset($_POST['Message'])) echo $Message; ?>
                            </textarea>
                        </div>
                    </fieldset>

                    <fieldset class="form-group">

                        <div class="col-md-12 text-center submit">
                             <input type="submit" name="submit" value="submit" class="btn btn-primary">
                        </div>
                    </fieldset>
                    <div class="col-md-12 text-center">
                    <?php
                    if(isset($success))
                    {
                        echo "<h3 style='color: green;'>".$success."</h3>";

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
