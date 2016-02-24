<?php

namespace Project\Classes\Router;
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
    self::add($pathAsName, $callback, $name);
  }

  public static function base($baseDir, Callable $callback) {
    self::$baseDir .= $baseDir;
    $callback();
    self::$baseDir = substr(self::$baseDir, 0, strpos(self::$baseDir, $baseDir));
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
  public static function dumpRoutes(){
    var_dump(self::$routes);
  }
  protected static function add($pathAsName, $action, $method) {
    list($path, $name) = self::separateName($pathAsName);
    self::$routes[] = new Route(self::$baseDir . $path, $name, $method, $action);
  }
  protected static function separateName($pathAsName) {
    return strpos($pathAsName, ' as ') ? explode(' as ', $pathAsName) : [$pathAsName, null];
  }

}

