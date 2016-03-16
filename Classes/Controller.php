<?php
namespace Project\Classes;

/**
 * Class Controller
 * @package Project\Classes
 */
abstract class Controller {
  protected $model;
  protected $view;
  // TODO: probably needs a better way to implement this

  public function action($action) {
    return function() use($action) {
      call_user_func([$this, $action]);
    };
  }

  /**
   * @param $result boolean
   * @param $errors string
   * @return array
   */
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