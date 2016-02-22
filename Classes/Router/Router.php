<?php

namespace Project\Classes\Router;

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
  /**
   * @var Route[]
   */
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
  protected function quickAdd($pathInfo, Callable $callback, $method) {
    // Try to grab link and name
    if (strpos($pathInfo, ' as ')) {
      list($path, $name) = explode(' as ', $pathInfo);
    }else {
      $path = $pathInfo;
      $name = null;
    }
    return new Route($this->baseDir . $path, $name, $method, $callback);
  }

  // TODO: separate match and not match logic
  public function start() {
    $hasMatch = false;
    foreach ($this->routes as $route) {
      if ($route->match()) {
        $hasMatch = true;
        break;
      }
    }
    if (!$hasMatch) {
      http_response_code(404);
      echo '<h1 style="color: hotpink;">Sorry, page not found...</h1>';
    }
  }

}

