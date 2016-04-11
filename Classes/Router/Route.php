<?php
/**
 * @Author Yi Zhao
 *
 */

namespace Project\Classes\Router;


use Project\Classes\Request;

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
  public function __construct($path, $name, $method, $callback) {
    $this->requestUrl = $_SERVER['REQUEST_URI'];
    $route = $this->getRouteParam($path);
    $routeParam = $route['param'];
    if (is_string($callback)) $callback = $this->controllerShortHand($callback, $routeParam);

    $this->path = !empty($routeParam) ? $route['route'] . '/' . $routeParam : $path;
    $this->name = $name;
    $this->method = $method;
    $this->callback = $callback;
  }

  public function match($base = '/') {
//    var_dump('Route base--', $base);
    if ($index = strpos($this->requestUrl, '?')) {
      $requestURL = substr($this->requestUrl, 0, $index);
    } else {
      $requestURL = $this->requestUrl;
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

  private function controllerShortHand($controllerAtAction, $routeParam) {
    if(preg_match('/.+@.+/', $controllerAtAction) == 1) {
      list ($controller, $action) = explode('@', $controllerAtAction);
      return function() use($controller, $action, $routeParam) {
        if (!empty($routeParam)) {
          call_user_func([new $controller(), $action], $routeParam, new Request());
        } else {
          call_user_func([new $controller(), $action], new Request());
        }
      };
    }
    throw new \Exception('syntax error');
  }

  private function getRouteParam($route) {
    $output = ['param' => '', 'route' => $route];
    if (preg_match('/(.+\/):(.+)/', $route, $match)) {
      $start = strpos($_SERVER['REQUEST_URI'], $match[1]) + strlen($match[1]);
      $output['route'] = $match[1];
      $output['param'] = htmlspecialchars(substr($_SERVER['REQUEST_URI'], $start));
    }
    return $output;
  }

}