<?php
require_once"../libs/Session.php";
include $_SERVER['DOCUMENT_ROOT'] . '/autoloader.php';
//$sessionTest = new Session('sessionId1','shoppingCart');
//echo $sessionTest->data['productOne']="rp";
////$sessionTest->destroy();
//$sessionTest1 = new Session('sessionId2','Cart1');
//echo $sessionTest1->data['productOne']="rp1";
?>

<html>
    <head></head>
    <body>
    <?php echo \Project\Payment\Payment::stripeButton(20) ?>
        <a href="./index.php?route=HomePageController/index">click</a>
        <a href="../index.php?route=BookingController/chooseTime/3/1/1">film Click</a>

    </body>
</html>
