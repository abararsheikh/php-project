<?php
/**
 * @Author Yi Zhao
 *
 */

namespace Project\Classes;


abstract class Helper {
  // Separates path names
  public static function separateName($pathAsName) {
    return strpos($pathAsName, ' as ') ? explode(' as ', $pathAsName) : [$pathAsName, null];
  }

}