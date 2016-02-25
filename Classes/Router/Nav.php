<?php

namespace Project\Classes\Router;

use Project\Classes\Helper;


/**
 * Class Nav
 * @package Project\Classes\Router
 * @author Yi Zhao
 */
class Nav extends Router {
  public static $groups = [];

  public static function group($pathAsName, array $routes, $end = false) {
    $r = NavGroup::group($pathAsName, $routes);
    return $end ? self::$groups[] = NavGroup::setRoot($r) : $r;
  }

  private static function getGroupInfo($key, $value) {
    return array_filter(self::$groups, function ($group) use ($key, $value) {
      return $group[$key] == $value;
    });
  }
}