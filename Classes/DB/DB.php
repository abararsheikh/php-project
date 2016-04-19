<?php
namespace Project\Classes\DB;

use PDO;

/**
 * @Author Yi Zhao
 *
 */
class DB {
  private static $_db;

  public static function getDB() {
    if (!self::$_db) {
      try {
        self::$_db = new PDO('mysql:host=' . DbConfig::SERVER . ';dbname=' . DbConfig::DB_NAME, DbConfig::DB_USER, DbConfig::DB_PASS);
      } catch (\PDOException $e) {
        echo 'database error: ', $e->getMessage();
      }
    }
    return self::$_db;
  }

  /**
   * Bind values then perform insert action.
   *
   * @param string $tableAndColumns Table name, and column name if necessary
   * @param array $valuesArray Array of values to be inserted, key should be column name
   * @param array $typesArray Array contains pdo param types of each column
   * @return bool|string              Return true if insert success, error message if not
   */
  public static function insert($tableName, array $valuesArray, array $typesArray) {
    $columns = join(',', array_keys($valuesArray));
    $valuesPlaceholder = join(',', array_map(function ($key) { return ":$key"; }, array_keys($valuesArray)));

    $insertStmt = self::getDB()->prepare("
      INSERT INTO $tableName ($columns)
      VALUES ($valuesPlaceholder);
    ");
    var_dump($insertStmt);
    $insertStmt = self::bindValues($insertStmt, $valuesArray, $typesArray);
    return $insertStmt->execute() ? true : $insertStmt->errorInfo()[2];
  }

  public static function select($tableName) {

  }

  public static function find($query, $params) {
    $stmt = self::getDB()->prepare($query);
    $stmt->execute($params);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  //
  private static function bindValues(\PDOStatement $stmt, array $valuesArray, array $typesArray) {
    foreach ($valuesArray as $key => $value) {
      $stmt->bindValue($key, $value, $typesArray[$key]);
    }
    return $stmt;
  }

  private static function valuesPlaceholder(array $valuesArray) {
    return join(',', array_map(function ($key) {
      return ":$key";
    }, array_keys($valuesArray)));
  }
}

include '../../autoloader.php';

$valuesArray = [
    'username' => 'test2',
    'password' => '123'
];
$typesArray = [
    'username' => PDO::PARAM_INT,
    'password' => PDO::PARAM_STR
];
$result = DB::insert('users', $valuesArray, $typesArray);
var_dump($result);
