<?php

namespace Project\Auth;

use \Project\Classes\DB as DB;
use \PDO;

// TODO: config, register, validation
/**
 * @Author Yi Zhao
 *
 */
class AuthModel {
  private $db;

  public function __construct() {
    $this->db = DB::getDB();
    session_start();
  }

  // New user
  public function newUser($username, $password, $email) {
    $newStmt = $this->db->prepare('
      INSERT INTO users(username, password, email)
      VALUES (:username, :password, :email);'
    );
    $newStmt->bindValue(':username', $username, PDO::PARAM_STR);
    $newStmt->bindValue(':password', password_hash($password, PASSWORD_DEFAULT), PDO::PARAM_STR);
    $newStmt->bindValue(':email', $email, PDO::PARAM_STR);

    $queryResult['success'] = $newStmt->execute() ? true : false;
    $queryResult['error'] = $newStmt->errorInfo()[2];

    return $queryResult;

  }
  public function logIn($username, $password) {
    $user = $this->findUser($username, $password);
    if (!$user) return false;
    $this->addUserToSession($user);
    $this->updateCookie(self::getUser('id'));
    return true;
  }
  public function logInViaCookie() {
    $cookie = isset($_COOKIE['rememberme']) ? $_COOKIE['rememberme'] : null;
    if (!$cookie) return false;
    list($id, $token) = explode(';', $cookie);
    $getTokenStmt = $this->db->prepare('
      SELECT * FROM tokens WHERE id = :id
    ');
    $getTokenStmt->bindValue(':id', $id, PDO::PARAM_STR);
    $getTokenStmt->execute();
    $tokenInfo = $getTokenStmt->fetch();
    if ($tokenInfo['token'] && hash_equals($token, $tokenInfo['token'])) {
      $userId = $tokenInfo['user_id'];
      $user = $this->db->query("
        SELECT * FROM users WHERE id = $userId;
      ")->fetch();
      $this->addUserToSession($user);
      // Change token after it is used for logging in
      $this->updateCookie(self::getUser('id'));
      return true;
    }
    return false;
  }
  public function logOut() {
    $this->deleteCookie(self::getUser('id'));
    $_SESSION = [];
    session_destroy();
  }

  // Static functions
  // Returns user information, false if user is not logged in
  public static function getUser($key = 'username') {
    return isset($_SESSION['user']) ? $_SESSION['user'][$key] : false;
  }


  // Private functions
  private function updateCookie($userId) {
    $id = hash('sha256', mt_rand());
    $token = password_hash(mt_rand(), PASSWORD_DEFAULT);
    $rememberStmt = $this->db->prepare('
      INSERT INTO tokens (id, token, user_id)
      VALUES(:id, :token, :userId)
      ON DUPLICATE KEY UPDATE token = :token;
    ');
    $rememberStmt->bindValue(':id', $id, PDO::PARAM_INT);
    $rememberStmt->bindValue(':userId', $userId, PDO::PARAM_INT);
    $rememberStmt->bindValue(':token', $token, PDO::PARAM_STR);
    if ($rememberStmt->execute()) {
      $cookie = "$id;$token";
      return setcookie('rememberme', $cookie, (time() + 604800), '/', '', false, true);
    } else {
      return false;
    }
  }
  private function deleteCookie($userId) {
    setcookie('rememberme', false, time() - 604800, '/', '', false, true);
    return $this->db->exec("
        DELETE FROM tokens WHERE user_id = $userId
    ");
  }
  private function findUser($username, $password) {
    $selectStmt = $this->db->prepare('
      SELECT * FROM users
      WHERE username = :username;
    ');
    $selectStmt->bindValue(':username', $username, PDO::PARAM_STR);
    if ($selectStmt->execute()) {
      $userInfo = $selectStmt->fetch(PDO::FETCH_ASSOC);
      return password_verify($password, $userInfo['password']) ? $userInfo : false;
    }
    return false;
  }
  private function addUserToSession($user) {
    $_SESSION['user'] = [
      'id' => $user['id'],
      'username' => $user['username'],
      'roleId' => $user['role_id'],
      'email' => $user['email']
    ];
  }

}

