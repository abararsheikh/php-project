<?php

spl_autoload_register(function ($name) {
  require_once "$name.php";
});

class Validator {
  protected $data;
  protected static $error = [];

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

  public function validate($key, $validatorArray) {
    $value = $this->data[$key];
    foreach ($validatorArray as $index => $validator) {
      if (is_array($validator)) {
        $validatorName = $validator[0];
        $args = array_slice($validator, 1);
        array_unshift($args, $value);
        $msg = call_user_func_array([$this, $validatorName], $args);
      } else {
        $msg = $this->$validator($value);
      }
      if (!empty($msg)) {
        if (!isset(self::$error[$key])) {
          self::$error[$key] = [];
        }
        array_push(self::$error[$key], $msg);
      }
    }
  }

  public function displayError($fieldName, $tagName = 'p') {
    if (!isset(self::$error[$fieldName])) { return; }

    foreach (self::$error[$fieldName] as $error) {
      echo "<$tagName>$error</$tagName>";
    }
  }

  public function displayErrorAll($tagName = 'p') {
    if (!isset($this->error)) { return; }

    foreach ($this->error as $errorList) {
      foreach ($errorList as $error) {
        echo "<$tagName>$error</$tagName>";
      }
    }
  }

  public function isValid($key = null) {
    if (!$key) {
      var_dump(self::$error);
      return empty(self::$error);
    }
    if ($key) {
      return !isset(self::$error);
    }
  }

  public function getKey($key) {
    return $this->data[$key];
  }

  // Validations
  public function notEmpty($value) {
    return !empty($value) ? '' : 'is empty';
  }

  public function greaterThan($value, $number) {
    return $value > $number ? '' : "$value is not greater than $number";
  }

  public function between($value, $lowerBound, $upperBound) {
    return ($value > $lowerBound && $value < $upperBound) ? '' : "$value is not between $lowerBound and $upperBound";
  }

  public function regex($value, $patternArray) {
    $pattern = $patternArray['pattern'];
    $error = $patternArray['error'];
    return preg_match($pattern, $value) ? '' : $error;
  }


}

//////////////////////////////////////////////
// Examples
//////////////////////////////////////////////

// Test data
$v = new Validator([
    'name' => 'asdfsdf',
    'age' => '20',
    'phone' => '123123',
    'email' => 'aoidsf@213.com'
]);

// Validate one field with multiple rules
$v->validate('name', [
    'notEmpty',
    ['greaterThan', 100],
    ['between', 0, 20]
]);
$v->validate('age', [
    'notEmpty',
    ['between', 0, 100]
]);

// Call additional validator
echo $v->addressValidator->street(3) . '<br>';
// Use getKey method to validate key value
echo $v->phoneValidator->phoneNumber('12345') . '<br>';
echo $v->phoneValidator->phoneNumber($v->getKey('phone')) . '<br>';

echo 'street', $v->addressValidator->validate('email', ['street']) . '<br>';

// Errors
echo '<hr/>';

if ($v->isValid()) {
  echo 'all valid';
}else {
  $v->displayError('age');
  echo 'something is wrong...';
  $v->displayErrorAll();
}

echo '<hr/>';

