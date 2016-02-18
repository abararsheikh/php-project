<?php

namespace Project\Auth;
use \Project\Classes\DB as DB;
use \PDO;
/**
 * @Author Yi Zhao
 *
 */

class AuthModel {
  private $db;
  public function __construct(PDO $database) {
    $this->db = $database;
    session_start();
  }
  // New user
  public function newUser($username, $password, $roleId = 1) {
    $newStmt = $this->db->prepare('
      INSERT INTO users(username, password, role_id)
      VALUES (:username, :password, :roleId);'
    );
    $newStmt->bindValue(':username', $username, PDO::PARAM_STR);
    $newStmt->bindValue(':password', password_hash($password, PASSWORD_DEFAULT), PDO::PARAM_STR);
    $newStmt->bindValue(':roleId', $roleId, PDO::PARAM_INT);
    return $newStmt->execute() ? true : $newStmt->errorInfo()[2];

  }
  public function logIn($username, $password) {
    $selectStmt = $this->db->prepare('
      SELECT * FROM users
      WHERE username = :username;
    ');
    $selectStmt->bindValue(':username', $username, PDO::PARAM_STR);
    if ($selectStmt->execute()) {
      $userInfo = $selectStmt->fetch(PDO::FETCH_ASSOC);
      if (password_verify($password, $userInfo['password'])) {
        $_SESSION['user'] = [
          'id' => $userInfo['id'],
          'username' => $userInfo['username'],
          'roleId' => $userInfo['role_id']
        ];
        return true; // when passwords match
      }
      return false; // when passwords don't match
    }
    return $selectStmt->errorInfo()[2]; // return connection error
  }
  public function logOut() {
    $_SESSION = [];
    session_destroy();
  }

  // Static functions
  // Returns user information, false if user is not logged in
  public static function getUser($key = 'username') {
    return isset($_SESSION['user']) ? $_SESSION['user'][$key] : false;
  }


  // Private functions

}

include '../autoloader.php';

$auth = new AuthModel(DB::getDB());
echo 'new user: ', $auth->newUser('123', '123'), '<br>';
echo 'Auth: ', $auth->logIn('123', '123'), '<br>';
echo 'Auth status: ', AuthModel::getUser(), '<br>';
$auth->logOut();
echo 'Auth status: ', AuthModel::getUser(), '<br>';
