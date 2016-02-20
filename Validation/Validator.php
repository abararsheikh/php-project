<?php

namespace Project\Validation;

include_once '../autoloader.php';
/**
 * Class Validator
 *
 * In order to use methods in Classes from other files,
 * please add new line using the following syntax:
 * at method ClassName methodNameToBeUsedHere()
 *
 * @method AddressValidator address()
 * @method PhoneValidator phone()
 * @method PasswordValidator password()
 * @method EmailValidator email()
 */
class Validator {
  protected $data;
  protected static $error = [];

  public function __construct($data) {
    if (is_array($data) && !empty($data)) {
      $this->data = $data;
    } else {
      throw new \Exception('invalid input value');
    }
  }
  public function __call($className, $arguments) {
    $className = __NAMESPACE__ . '\\' . ucfirst($className) . 'Validator';
    return new $className($this->data);
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
    if (!isset(self::$error[$fieldName])) return;

    foreach (self::$error[$fieldName] as $error) {
      echo "<$tagName>$error</$tagName>";
    }
  }
  public function displayErrorAll($tagName = 'p') {
    if (!isset(self::$error)) return;

    foreach (self::$error as $errorList) {
      foreach ($errorList as $error) {
        echo "<$tagName>$error</$tagName>";
      }
    }
  }
  public function isValid($key = null) {
    if (!$key) {
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

  /*
   * Author Ran
   * Length Validator
   * equal Validator
   */
   public function length($value, $length){
     if(!is_string($value)){
         $value = strval($value);
     }
     return (strlen($value)==$length)? '' : "length is not equal to $length";
   }

   public function equal($value, $compareValue){
     if(gettype($value)==gettype($compareValue)){
       return ($value==$compareValue)? '':"$value is not equal to $compareValue";
     }
     else
       return 'data type is not equal';

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
    'email' => 'aoidsf@213.com',
    'password' => 'wang1@'
]);

// Validate one field with multiple rules
$v->validate('name', [
    'notEmpty',
    ['greaterThan', 100],
    ['between', 0, 20]
]);
$v->validate('age', [
    'notEmpty',
    ['between', 0, 100],
]);


//length validation
//equal validation
$v->validate('name',[
    ['length',7]
]);

$v->validate('name',[
    ['equal',true]
]);
// Email
$v->email()->validate('age', [
    ['EmailValidator', '123.com']
]);

// Call additional validator
echo $v->address()->street(3) . '<br>';
// Use getKey method to validate key value
echo $v->phone()->phoneNumber('12345') . '<br>';
echo $v->phone()->phoneNumber($v->getKey('phone')) . '<br>';


echo 'street', $v->address()->validate('email', ['street']) . '<br>';

//password validation
echo $v->password()->password($v->getKey('password')). '<br>';

// Errors
echo '<hr/>';
if ($v->isValid()) {
  echo 'all valid';
}else {
  echo 'error on age field: ';
  $v->displayError('age');
  echo 'All errors';
  $v->displayErrorAll();
}
echo '<hr/>';

