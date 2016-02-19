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
}