<?php

namespace Project\Classes\Router;


/**
 * Class Nav
 * @package Project\Classes\Router
 * @author Yi Zhao
 */
class Nav {
  public static $groups = [];

  // if it is the root level group, add it to groups, otherwise return the group.
  public static function group($pathAsName, array $routes, $end = false) {
    $r = NavGroup::group($pathAsName, $routes);
    return $end ? self::$groups[] = NavGroup::setRoot($r) : $r;
  }

  public static function test() {
    $g = self::getLinks(self::$groups);
    $g = self::filterMethod($g);
    var_dump('---final result---', $g);
  }

  public static function getLinks($group) {
    return array_map(function ($item) {
      if (is_object($item)) {
        $r['name'] = $item->getProp('name');
        $r['path'] = $item->getProp('path');
        $r['method'] = $item->getProp('method');
        return $r;
      }
      if (array_key_exists('routes', $item)) {
        $item['routes'] = self::getLinks($item['routes']);
        return $item;
      }
      return false;
    }, $group);
  }

  /**
   * Recursively find routes that match the condition.
   * It is used to filter all GET method
   *
   * @param array $group  Array of route groups, filtered with getLinks method.
   * @param string $key   Key of array items.
   * @param string $value Value of the key.
   * @return mixed        All items which matches to the condition
   */
  public static function filterMethod(array $group, $value = 'GET', $key = 'method') {
    return array_reduce($group, function ($acc, $currItem) use ($key, $value) {
      if (is_array($currItem) ) {
        if(array_key_exists($key, $currItem)){
          return strcasecmp($currItem[$key], $value) == 0 ? array_merge($acc, [$currItem]) : $acc;
        }
        if(array_key_exists('routes', $currItem)){
          $currItem['routes'] = self::filterMethod($currItem['routes'], $key, $value);
          $acc[] = $currItem;
          return $acc;
        }
      }
    }, []);
  }

}