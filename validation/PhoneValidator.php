<?php
require_once 'Validator.php';

class PhoneValidator extends Validator{
  public function phoneNumber($key) {
    $pattern = '/1?\W*([2-9][0-8][0-9])\W*([2-9][0-9]{2})\W*([0-9]{4})(\se?x?t?(\d*))?/';
    return preg_match($pattern, $this->data[$key]) == 1 ? '' : 'invalid phone number';
  }
}