<?php

namespace Project\Payment;
use Project\Auth\models\AuthModel;
use \Project\Classes\Config\PaymentKeys;


class Payment {

  public function __construct() {
    \Stripe\Stripe::setApiKey(PaymentKeys::STRIPE['secret_key']);
  }

  public function stripe($stripeToken) {
    $customer = \Stripe\Customer::create(array(
        'email' => AuthModel::getUser('email'),
        'source' => $stripeToken
    ));
    $charge = \Stripe\Charge::create(array(
        'customer' => $customer->id,
        'amount' => $_SESSION['paymentAmount'],
        'currency' => 'cad'
    ));
    unset($_SESSION['paymentAmount']);

    // TODO: need handle payment errors
    return true;
  }

  public static function stripeButton($amount) {
    $publishable_key = PaymentKeys::STRIPE['publishable_key'];
    $actionPath = PaymentKeys::STRIPE['actionPath'];
    $_SESSION['paymentAmount'] = $amount *= 100;

    return "
    <form action=$actionPath method='post'>
      <script src='https://checkout.stripe.com/checkout.js' class='stripe-button'
            data-key=$publishable_key
            data-name='PHP Cinema'
            data-label='Pay with Stripe'
            data-description='add description later...'
            data-amount=$amount
            data-currency='cad'
            data-locale='auto'>
      </script>
    </form>";
  }
}