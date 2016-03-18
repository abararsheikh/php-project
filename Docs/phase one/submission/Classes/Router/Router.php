<?php

namespace Project\Classes\Router;
use Project\Classes\Helper;

/**
 * Class Router
 *
 * @Author: Yi Zhao
 * @method void get($path, $callback)
 * @method void post($path, $callback)
 */
class Router {
  /**
   * @var Route[]
   */
  private $routes = [];
  private $baseDir = '';

  public function __call($name, $arguments) {
    list($pathAsName, $callback) = $arguments;
    array_push($this->routes, $this->add($pathAsName, $callback, $name));
  }

  public function startRouting($base = '') {
    foreach ($this->routes as $route) {
      // get_class($route) == __NAMESPACE__ . '\Route'
      if ( is_object($route) && $route->match($base)) {
        return true;
      }
    }
    return false;
  }
  public function dumpRoutes() {
    var_dump($this->routes);
  }

  protected function add($pathAsName, $action, $method = 'GET') {
    list($path, $name) = Helper::separateName($pathAsName);
    return new Route($this->baseDir . $path, $name, $method, $action);
  }




}

