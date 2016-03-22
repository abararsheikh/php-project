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

  public static function getParam($name, $method = INPUT_POST, $filter=FILTER_SANITIZE_ENCODED) {
    return filter_input($method, $name, $filter);
  }

  public static function startSession() {
    if (session_status() == PHP_SESSION_NONE) {
      session_start();
    }
  }

  public static function includeAutoLoader() {
    include_once $_SERVER['DOCUMENT_ROOT'] . '/autoloader.php';
  }

}