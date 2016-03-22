<?php

/**
 * Created by PhpStorm.
 * User: yi
 * Date: 22/03/16
 * Time: 1:14 AM
 */
use \Project\Payment\Payment;
include '../autoloader.php';

// Start a session, there is no need to add this line if session is active.
\Project\Classes\Helper::startSession();

// Create a pay with stripe button on page.
// Pass in the amount needs to be paid.
echo Payment::stripeButton(20);