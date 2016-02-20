<?php
namespace Project\Classes;

/**
 * Class Controller
 * @package Project\Classes
 */
abstract class Controller {
  // TODO: probably needs a better way to implement this
  public function action($action) {
    return function() use($action) {
      call_user_func([$this, $action]);
    };
  }
  public function resultArray($result, $errors) {
    $output = [ 'success' => false, 'error' => [] ];
    if ($result) {
      $output['success'] = true;
    }else {
      $output['error'][] = $errors;
    }
    return $output;
  }

}