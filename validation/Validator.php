<?php

spl_autoload_register( function ($name) {
  require_once "$name.php";
});

// TODO: decide either use value or key as parameter of validation functions
class Validator {
  protected $data;
  protected $error = [];

  public $phoneValidator;
  public $addressValidator;

  public function __construct($data) {
    if (is_array($data) && !empty($data)) {
      $this->data = $data;
    } else {
      throw new Exception('invalid input value');
    }

    if (get_class($this) == 'Validator') {
      $this->phoneValidator = new PhoneValidator($data);
      $this->addressValidator = new AddressValidator($data);
    }
  }

  // TODO: find out a way to display error message
  public function validate($key, $validatorArray) {
    $value = $this->data[$key];
    $this->error[$key] = [];
    foreach ($validatorArray as $index => $validator) {

      if (is_array($validator)) {
        // Takes first item in array as function name
        // Items after as parameters
        $validatorName = $validator[0];
        $args = array_slice($validator, 1);
        // Inserts key value to the beginning of params array
        array_unshift($args, $value);
        // Calls the validation function
        $msg = call_user_func_array([$this, $validatorName], $args);
      } else {
        // If there is no additional parameter, call the function with key value
        $msg = $this->$validator($value);
      }
      array_push($this->error[$key], $msg);
    }
  }
  public function displayError($fieldName, $tagName = 'p') {
    foreach ($this->error[$fieldName] as $error) {
      echo "<$tagName>$error</$tagName>";
    }
  }
  public function displayErrorAll($tagName = 'p') {
    foreach ($this->error as $errorList) {
      foreach ($errorList as $error) {
        echo "<$tagName>$error</$tagName>";
      }
    }
  }

  public function getError($fieldName) {
    return $this->error[$fieldName];
  }

  public function loadClass($className) {
    require_once $className;
  }

  public function getKey($key) {
    return $this->data[$key];
  }

  public function isEmpty($value) {
    return empty($value) ? '' : 'not empty';
  }

  public function greaterThan($value, $number) {
    return $value > $number ? '' : "$value is not greater than $number";
  }

  public function between($value, $lowerBound, $upperBound) {
    return ($value > $lowerBound && $value < $upperBound) ? '' : "$value is not between $lowerBound and $upperBound";
  }

  public function regex($value, $patternArray) {
    $pattern = $patternArray['pattern'];
    $error = $patternArray['pattern'] || 'does not match';
    return preg_match($pattern, $value) ? '' : $error;
  }


}

// Test data
$v = new Validator([
    'name' => 'asdfsdf',
    'age' => '20',
    'phone' => '123123',
    'email' => 'aoidsf@213.com'
]);

// Validate one field with multiple rules
$v->validate('age', [
    'isEmpty',
    ['greaterThan', 100],
    ['between', 0, 20]
]);
$v->validate('name', [
    'isEmpty',
    ['between', 0, 20]
]);

// Errors
$v->displayError('name');
echo '<hr/>';
$v->displayErrorAll();
echo '<hr/>';

// Call additional validator
echo $v->addressValidator->street(3) . '<br>';
// Use getKey method to validate key value
echo $v->phoneValidator->phoneNumber( '12345' ) . '<br>';
echo $v->phoneValidator->phoneNumber( $v->getKey('phone') ) . '<br>';

echo $v->addressValidator->validate('age', ['street']) . '<br>';
