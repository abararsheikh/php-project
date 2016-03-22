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

  // GET: /payment/stripe
  public function Stripe() {
    $token = Helper::getParam('stripeToken');
    if ($this->model->stripe($token)) {
      header('Content-Type: application/json');
      echo json_encode($this->resultArray(true, null));
    }
  }
}