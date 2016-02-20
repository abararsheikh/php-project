<?php
/**
 * @Author Yi Zhao
 *
 */

namespace Project\Classes;


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
    }else if (is_array($errors)) {
      $output['error'] = array_reduce($errors, 'array_merge', []);
    }else {
      $output['error'][] = $errors;
    }
    return $output;
  }

}