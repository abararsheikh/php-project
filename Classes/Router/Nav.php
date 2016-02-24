<?php

namespace Project\Classes\Router;


/**
 * Class Nav
 * @package Project\Classes\Router
 * @author Yi Zhao
 */
class Nav extends Router {
  public static $groups = [];

  public static function add($base, $name, $default = '/') {
    self::$groups[] = [
      'base' => self::$baseDir . $base,
      'name' => $name,
      'default' => $default,
    ];
  }
  public static function group($pathAsName, callable $callback) {
    list($path, $name) = self::separateName($pathAsName);
    self::add($path, $name);
    self::base($path, $callback);
  }

  /**
   * @param $groupName string
   * @param null $base string
   * @return Route[]
   */
  public static function getGroup($groupName, $base = null) {
    // Match path
    $matchBase = function (Route $item) use($base) {
      return self::isIncludedIn($base, $item->getProp('path'));
    };
    /**
     * Match group name
     * @param Route $item Route passed in when calling filer function.
     * @return boolean True if there is a match.
     */
    $matchName = function (Route $item) use($groupName) {
      // Gets base dirs from items in self::groups array which has same name as $groupName.
      $baseDir = array_reduce(self::$groups, function ($acc, $curr) use($groupName) {
        return strcasecmp($curr['name'], $groupName) == 0 ? array_merge($acc, [$curr['base']]) : $acc;
      }, []);
      // Tries to find a match by comparing path of each routes and the path of that group.
      return array_reduce($baseDir, function ($acc, $currBase) use($item) {
        return $acc ? true : self::isIncludedIn($currBase, $item->getProp('path'));
      }, false);
    };

    $result = array_filter(self::$routes, $matchName);
    return $base == null ? $result : array_filter($result, $matchBase);
  }
  public static function displayMenu($name, $base = null) {
    // Get methods only
    $routes = array_filter(self::getGroup($name, $base), function(Route $route) {
      return strcasecmp($route->getProp('method'), 'get') == 0;
    });
    var_dump($routes);
    foreach ($routes as $route) {
      $name = $route->getProp('name');
      $link = $route->getProp('path');
      echo "<li>$name: $link</li>";
    }
  }

  private static function isIncludedIn($lookingFor, $inPath){
    $lookingFor = '/^' . str_replace('/', '\/', $lookingFor) . '\//i';
    return 1 == preg_match($lookingFor, $inPath);
  }

  public static function rearrange($groupName, $base = null) {
    $groupName = 'Auth';
    $routes = Nav::getGroup($groupName, $base);
    // todo: get dirs and find include children
    $baseDir = array_reduce(self::$groups, function ($acc, $curr) use($groupName) {
      return strcasecmp($curr['name'], $groupName) == 0 ? array_merge($acc, [$curr['base']]) : $acc;
    }, []);

//    array_map(function($dir) {
//      array_filter(self::$groups, function ($group) use($groupName){
//        if($group['name'] == $groupName) return false;
//        return self::isIncludedIn('/Auth', $group['base']);
//      });
//    }, $baseDir);
    $childGroups = array_filter(self::$groups, function ($group) use($groupName){
      if($group['name'] == $groupName) return false;
      return self::isIncludedIn('/Auth', $group['base']);
    });
    // todo: rename
    $childIndex = [];
    foreach ($childGroups as $child) {
      $childIndex[] = array_reduce($routes, function($acc, $currRoute) use($child){
        $isChild = self::isIncludedIn($child['base'], $currRoute->getProp('path'));
        $isChild ? $acc[ $child['name'] ][] = $currRoute : $acc[] = $currRoute;
        return $acc;
      }, []);
    }

    var_dump(call_user_func_array('array_replace', $childIndex));
  }
}