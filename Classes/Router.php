<?php

namespace Project\Classes;

/**
 * Class Router
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
  // need to test 404 part
  public function start() {
    $match = $this->match();
    if (!$match) {
      http_response_code(404);
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
        $route['callback']();
        return true;
      }
    }
    return false;
  }
  // Creates shortcuts for different methods.
  private function quickAdd($path, $callback, $method) {
    if (preg_match('/\/\w+$/', $path)) $path .= '.php';
    $this->routes[] = [
        'path' => $path,
        'method' => $method,
        'callback' => $callback,
        'name' => null
    ];
  }

}

// Test
$r = new Router();

$r->add('/Classes/Router.php', 'POST', 'testPost', function() {
  echo 'post success';
});
$r->get('/Classes/Router', function() {
  echo 'get!';
});
$r->get('/', function() {
  echo '/////';
});
$r->start();
$r->dumpRoutes();
