<?php

namespace Project\Classes;

/**
 * Class Router
 *
 * Root is current directory.
 * It won't work if there is .php after the route
 * Example:
 *  $authRouter = new Router()
 *  $authRouter->get('/ as Home', $controller->action('actionName'))
 *  $authRouter->post('/path', function() { do something here... })
 *
 * @Author: Yi Zhao
 * @method Router get($path, $callback)
 * @method Router post($path, $callback)
 */
class Router {
  protected $routes = [];
  protected $baseDir = '';

  public function __construct($baseDir = null) {
    // Sets default base
    $this->baseDir = ($baseDir == null) ? dirname($_SERVER['PHP_SELF']) : $baseDir;
  }

  public function __call($name, $arguments) {
    list($path, $callback) = $arguments;
    $this->routes[] = $this->quickAdd($path, $callback, strtoupper($name));
  }
  // example: add('/', 'GET', 'Home', function() {})
  public function add($path, $method, $name, $callback) {
    $this->routes[] = [
      'method' => $method,
      'path' => $path,
      'name' => $name,
      'callback' => $callback,
    ];
  }
  // TODO: separate match and not match logic
  public function start() {
    $match = $this->match();
    if (!$match) {
      http_response_code(404);
      echo '<h1 style="color: hotpink;">Sorry, page not found...</h1>';
    }
  }
  // For test purpose
  public function dumpRoutes() {
    var_dump($this->routes);
  }
  // Creates shortcuts for different methods.
  protected function quickAdd($pathInfo, Callable $callback, $method) {
    // Try to grab link and name
    if (strpos($pathInfo, ' as ')) {
      list($path, $name) = explode(' as ', $pathInfo);
    }else {
      $path = $pathInfo;
      $name = null;
    }
    return [
        'path' => $this->baseDir . $path,
        'method' => $method,
        'callback' => $callback,
        'name' => $name
    ];
  }
  private function match() {
    if( $index = strpos($_SERVER['REQUEST_URI'], '?') ) {
      $requestURL = substr($_SERVER['REQUEST_URI'], 0, $index);
    }else {
      $requestURL = $_SERVER['REQUEST_URI'];
    }
    $requestMethod = $_SERVER['REQUEST_METHOD'];
    foreach ($this->routes as $route) {
      if(strtolower($requestURL) == strtolower($route['path']) && $requestMethod == $route['method']) {
        $callback = $route['callback'];
        if (is_callable($callback)) call_user_func($callback);
        return true;
      }
    }
    return false;
  }

}

