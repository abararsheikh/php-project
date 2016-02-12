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
  // TODO: find out a way to display error message
  public function validate($key, $validatorArray) {
    $value = $this->data[$key];
    foreach ($validatorArray as $index => $validator) {
      if ( is_array($validator) ) {
        // Takes first item in array as function name
        // Items after as parameters
        $validatorName = $validator[0];
        $args = array_slice($validator, 1);
        // Inserts key value to the beginning of params array
        array_unshift($args, $value);
        // Calls the validation function
        echo call_user_func_array([$this, $validatorName], $args);
      }else {
        // If there is no additional parameter, call the function with key value
        echo $this->$validator($value);
      }
      // delete this line after figure out how to display error message
      echo '<br>';
    }
  }
  public function isEmpty($value) {
    return empty($value) ? 'empty value' : 'not empty';
  }
  public function greaterThan($value, $number) {
    return $value > $number ? '' : "$value is not greater than $number";
  }

}

// Test
$v = new Validator([1,2,3]);

$v->validate(1, [ 'isEmpty', ['greaterThan', 3] ]);

echo $v->phoneValidator->phoneNumber(1);
echo '<br>';