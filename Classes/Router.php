<?php

namespace Project\Classes;

/**
 * Class Router
 *
 * Current directory is the root directory.
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
  private $routes = [];

  public function __call($name, $arguments) {
    list($path, $callback) = $arguments;
    $this->quickAdd($path, $callback, strtoupper($name));
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
  public function getRoutes($filterKey, $value) {
    return array_reduce($this->routes, function($acc, $item) use($filterKey, $value) {
      if ($item[$filterKey] == $value) $acc[] = $item;
      return $acc;
    }, []);
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
  private function match() {
    if( $index = strpos($_SERVER['REQUEST_URI'], '?') ) {
      $requestURL = substr($_SERVER['REQUEST_URI'], 0, $index);
    }else {
      $requestURL = $_SERVER['REQUEST_URI'];
    }
    $requestMethod = $_SERVER['REQUEST_METHOD'];
    foreach ($this->routes as $route) {
      if($requestURL == $route['path'] && $requestMethod == $route['method']) {
        $callback = $route['callback'];
        if (is_callable($callback)) call_user_func($callback);
        return true;
      }
    }
    return false;
  }

  // Creates shortcuts for different methods.
  private function quickAdd($pathInfo, $callback, $method) {
    // Try to grab link and name
    if (strpos($pathInfo, ' as ')) {
      list($path, $name) = explode(' as ', $pathInfo);
    }else {
      $path = $pathInfo;
      $name = null;
    }

    $this->routes[] = [
        'path' => dirname($_SERVER['PHP_SELF']) . $path,
        'method' => $method,
        'callback' => $callback,
        'name' => $name
    ];
  }

}

