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

  public function match($base = '/') {
//    var_dump('Route base--', $base);
    if ($index = strpos($_SERVER['REQUEST_URI'], '?')) {
      $requestURL = substr($_SERVER['REQUEST_URI'], 0, $index);
    } else {
      $requestURL = $_SERVER['REQUEST_URI'];
    }
    $requestMethod = $_SERVER['REQUEST_METHOD'];

//    var_dump('request', $requestURL);
//    var_dump('match', $base . $this->path);
    $path = $base . $this->path;
    // takeout extra slash
    $path = str_replace('//', '/', $path);
    if (strtolower($requestURL) == strtolower($path) &&
        strtolower($requestMethod) == strtolower($this->method)
    ) {
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

  public function setProp($propName, $value) {
    $this->$propName = $value;
  }


}