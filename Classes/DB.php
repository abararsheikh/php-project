<?php
namespace Project\Classes;

/**
 * @Author Yi Zhao
 *
 */

define('SERVER', 'localhost:3306');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'php_project');

class DB {
  private static $_db;
  public static function getDB() {
    if (!self::$_db) {
      try {
        self::$_db = new \PDO('mysql:host=' . SERVER . ';dbname=' . DB_NAME, DB_USER, DB_PASS);
      } catch (\PDOException $e) {
        echo 'database error: ', $e->getMessage();
      }
    }
    return self::$_db;
  }
}

