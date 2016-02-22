<?php
/**
 * @Author Yi Zhao
 *
 */

namespace Project\Classes\Router;


class Route {
  private $path;
  private $name;
  private $method;
  private $callback;

  /**
   * Route constructor.
   * @param $path string
   * @param $name string
   * @param $method string
   * @param callable $callback
   */
  public function __construct($path, $name, $method, Callable $callback) {
    $this->path = $path;
    $this->name = $name;
    $this->method = $method;
    $this->callback = $callback;
  }
  public function match() {
    if( $index = strpos($_SERVER['REQUEST_URI'], '?') ) {
      $requestURL = substr($_SERVER['REQUEST_URI'], 0, $index);
    }else {
      $requestURL = $_SERVER['REQUEST_URI'];
    }
    $requestMethod = $_SERVER['REQUEST_METHOD'];

    if(strtolower($requestURL) == strtolower($this->path) && $requestMethod == $this->method) {
      call_user_func($this->callback);
      return true;
    }
    return false;
  }

  /**
   * @param $propName string
   * @return mixed
   */
  public function getProp($propName) {
    return $this->$propName;
  }


}