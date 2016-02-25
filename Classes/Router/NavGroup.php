<?php
/**
 * @Author Yi Zhao
 *
 */

namespace Project\Classes\Router;


use Project\Classes\Helper;

class NavGroup extends Router{

  private $navGroup = [];

  public function getGroup() {
    return $this->setRoot($this->navGroup, '');
  }


  public static function group($pathAsName, array $routes) {
    list($path, $name) = Helper::separateName($pathAsName);
    $r['path'] = $path;
    $r['name'] = $name;
    $r['routes'] = array_map(function ($routeParams) use ($path) {
      if (is_array($routeParams) && array_key_exists('routes', $routeParams)) return $routeParams;
      return forward_static_call_array(['self', 'add'], $routeParams);
    }, $routes);

    return $r;
  }

  public static function setRoot($group, $root = '') {
    $base = $root . $group['path'];
    $group['path'] = $base;
    $group['routes'] = array_map(function ($item) use($base) {
      if (is_object($item)) {
        $item->setProp('path', $base . $item->getProp('path'));
        return $item;
      }else {
        return self::setRoot($item, $base);
      }
    }, $group['routes']);
    return $group;
  }
}