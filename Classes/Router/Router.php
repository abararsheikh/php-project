<?php

namespace Project\Classes\Router;
use Project\Classes\Helper;
use Project\Classes\View;

/**
 * Class Router
 *
 * @Author: Yi Zhao
 * @method static void get($path, $callback)
 * @method static void post($path, $callback)
 */
class Router {
  /**
   * @var Route[]
   */
  protected static $routes = [];
  protected static $baseDir = '';

  public static function __callStatic($name, $arguments) {
    list($pathAsName, $callback) = $arguments;
    array_push(self::$routes, self::add($pathAsName, $callback, $name));
  }

  public static function startRouting($base = '/') {
    $hasMatch = false;
    foreach (self::$routes as $route) {
      if (stristr($route->getProp('path'), $base ) && $route->match()) {
        $hasMatch = true;
        break;
      }
    }
    if (!$hasMatch) {
      http_response_code(404);
      echo '<h1 style="color: hotpink;">Sorry, page not found...</h1>';
    }
  }

  protected static function add($pathAsName, $action, $method = 'GET') {
    list($path, $name) = Helper::separateName($pathAsName);
    return new Route(self::$baseDir . $path, $name, $method, $action);
  }


}

