<?php

namespace Project\Classes;

/**
 * Class Navs
 * A collection of Navigation
 * @package Project\Classes
 * @Author Yi Zhao
 */
class Navs {
  /**
   * @var Navigation[]
   */
  private static $navs = [];
  private static $group = [];

  /**
   * @param $name string
   * @return Navigation
   */
  public static function get($name){
    return self::$navs[$name];
  }
  public static function addNav(Navigation $nav) {
    self::$navs[$nav->getName()] = $nav;
  }


}