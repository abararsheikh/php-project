<?php

namespace Project\Payment;

use Project\Classes\Controller;
use Project\Classes\Helper;

/**
 * Class PaymentController
 * @property Payment model
 * @package Project\Payment
 */
class PaymentController extends Controller{

  public function __construct() {
    $this->model = new Payment();
  }

  // POST: /payment/stripe
  public function Stripe() {
    $token = Helper::getParam('stripeToken');
    if ($this->model->stripe($token)) {
      header('Refresh: 5; url=/');
      echo "<h1 style='color: lightgreen;'>Thank you, you will be redirected to homepage shortly</h1>";
    }
  }
}