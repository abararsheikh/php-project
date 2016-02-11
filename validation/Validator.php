<?php

require_once 'PhoneValidator.php';

class Validator {
  protected $data;

  public $phoneValidator;

  public function __construct($data) {
    if (is_array($data) && !empty($data)) {
      $this->data = $data;
    }else {
      throw new Exception('invalid input value');
    }

    if (get_class($this) == 'Validator') {
      $this->phoneValidator = new PhoneValidator($data);
    }
  }
  public function validate($key, $validatorArray) {
    $value = $this->data[$key];
    foreach ($validatorArray as $index => $validator) {
      if ( is_array($validator) ) {
        echo $this->$validator[0]($value, $validator[1]);
      }else {
        echo $this->$validator($value);
      }
    }
  }
  public function isEmpty($value) {
    return empty($value) ? 'empty value' : 'not empty';
  }
  public function greaterThan($value, $number) {
    return $value > $number ? '' : "$value is not greater than $number";
  }

}

$v = new Validator([1,2,3]);
$v->validate(1, [ 'isEmpty', ['greaterThan', 3] ]);
echo $v->phoneValidator->phoneNumber(1);