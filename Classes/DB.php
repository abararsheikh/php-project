<?php
namespace Project\Classes;

/**
 * @Author Yi Zhao
 *
 */

class DB {
  private static $_db;
  public static function getDB() {
    if (!self::$_db) {
      try {
        self::$_db = new \PDO('mysql:host=' . DbConfig::SERVER . ';dbname=' . DbConfig::DB_NAME, DbConfig::DB_USER, DbConfig::DB_PASS);
      } catch (\PDOException $e) {
        echo 'database error: ', $e->getMessage();
      }
    }
    return self::$_db;
  }
}

