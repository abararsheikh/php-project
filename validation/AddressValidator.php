<?php

class AddressValidator extends Validator {

  const STREET = [
    'pattern' => '/^([0-9]+ )?[a-zA-Z ]+$/',
    'error' => 'not a valid street'
  ];
  const PROVINCE = '/^(?:AB|BC|MB|N[BLTSU]|ON|PE|QC|SK|YT)*$/';
  const POSTAL_CODE = '/^([ABCEGHJKLMNPRSTVXY][0-9][A-Z] [0-9][A-Z][0-9])*$/';


  public function street($value) {
    return preg_match('/^([0-9]+ )?[a-zA-Z ]+$/', $value) ? '' : "$value is invalid street";
  }
  public function canadianProvince($value) {
    $pattern = '/^(?:AB|BC|MB|N[BLTSU]|ON|PE|QC|SK|YT)*$/';
    return preg_match($pattern, $value) ? '' : "$value is not a valid province";
  }
  public function canadianPostalCode($value) {
    $pattern = '/^([ABCEGHJKLMNPRSTVXY][0-9][A-Z] [0-9][A-Z][0-9])*$/';
    return preg_match($pattern, $value) ? '' : "$value is not a valid postal code";
  }
}