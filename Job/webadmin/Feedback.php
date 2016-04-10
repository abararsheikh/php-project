<?php
// Get the product data
if(isset($_POST['send'])){
    $username1 = $_POST['UserName1'];
    $phone = $_POST['Phone'];
    $email = $_POST['email'];
    $address = $_POST['address'];
    $message = $_POST['message'];
// Validate inputs\
    var_dump($_POST);

    if (empty($username1) || empty($phone) || empty($email)|| empty($address)|| empty($message) ) {
        $error = "Invalid data. Check all fields and try again.";
    } else {
        require_once('conn.php');
        $query = "INSERT INTO feedback
                 (username, phone, email, address,message)
              VALUES
                 ('$username1', '$phone', '$email', '$address','$message')";
        $db->exec($query);

    }
}

?>

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Feed back</title>
</head>

<script language="JavaScript">
    function  Check_stu()
    {

        if (document.form1.UserName1.value == "")
        {   alert("Enter username");
            document.form1.UserName1.focus();
            return false;
        }
        if (document.form1.phone.value == "")
        {   alert("Enter phone");
            document.form1.phone.focus();
            return false;
        }
        if (document.form1.email.value == "")
        {   alert("Enter email");
            document.form1.email.focus();
            return false;
        }
        if (document.form1.address.value == "")
        {   alert("Enter address");
            document.form1.address.focus();
            return false;
        }
        if (document.form1.message.value == "")
        {   alert("Enter message");
            document.form1.message.focus();
            return false;
        }
    }
</script>
<body>

<div class="contact-textarea">

    <div style="margin: 0 auto; width: 40%;" >

        <form name="form1" action="" method="post" >
            <div id="reg">
                <h3>Feedback page</h3>
                <div id="slider">
                    <div class="form-step" >



                        <div class="row" >
                            <div class="form-left" style="font-size: 20px;">username *</div>
                            <div class="form-right"><input type="text"  name="UserName1" class="form-input" /></div>

                        </div>
                        <div class="row">
                            <div class="form-left" style="font-size: 20px;">Phone *</div>
                            <div class="form-right" ><input type="text"  name="Phone" class="form-input" /></div>
                        </div>

                        <div class="row">
                            <div class="form-left" style="font-size: 20px;">Email *</div>
                            <div class="form-right" ><input type="text"  name="email" class="form-input" /></div>
                        </div>

                        <div class="row">
                            <div class="form-left" style="font-size: 20px;">address *</div>
                            <div class="form-right" ><input type="text"  name="address" class="form-input" /></div>
                        </div>

                        <div class="row">
                            <textarea name="message"  style="width:66%;padding:2%;height:50%; border-left-width:50%;font:36px/44px sans-serif;color:white;text-shadow:1px 1px 5px black; background:url('');">
How was your feeling?
</textarea>

                    </div>
                        <div id="form-submit">

                            <input  type="submit" id="Submit" value="ADD" name="send">
                            <button class="button1" type="reset" value="CLEAR" id="clean1" >CLEAR</button>

                        </div>


                    <div id="output" style="margin: 0 auto; width: 40%; color: red;"></div>
                </div>
            </div>


        </form>
    </div>

</div>
</body>

<style type='text/css'>
    @media only screen and (min-width:1024px) {
        .wrappMax .wrapp_box{
            width: 1024px;
        }
        body {
            background-color:#fff;
            max-width: 1024px;
            max-height: inherit;
        }
        #reg{
            width:750px;
            height:500px;
            background:#f4f4f4;
        }
        #reg h3{
            height:60px;
            text-shadow: 1px 1px 2px #000;
            color:#fff;
        }
        #slider {
            padding:0;
            margin:0;
            width:700px;
            height:400px;
        }
        .form-step{
            padding:16% 3% !important;
        }
        .form-left{
            color: #717171;
            float: left;
            font-size: 13px;
            padding: 5px;
            width: 200px;
        }
        .form-right{
            float: left;
            width: 214px;
        }
        .row{
            float: left;
            margin: 5px 0;
            width: 100%;

        }
        .form-step input[type='text']{
            border: 1px solid #CFCFCF;
            border-radius: 4px 4px 4px 4px;
            height: 25px;
            padding: 3px;
            width: 200px;
        }

        #password {
            height: 26px;
            width: 206px;
        }
        #username{
            height: 26px;
            width: 203px;
        }
</style>

</html>