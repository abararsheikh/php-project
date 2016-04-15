<?php

namespace Project\Auth\models;

use \Project\Classes\DB\DB as DB;
use \PDO;
use Project\Classes\Helper;

// TODO: config
/**
 * @Author Yi Zhao
 *
 */
class AuthModel {
  protected $db;

  public function __construct() {
    $this->db = DB::getDB();
    Helper::startSession();
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

  public function adminLogin($username, $password) {
    $user = $this->findUser($username, $password);
    if (!$user || $user['role_id'] !== '0') return false;
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
  public function checkAvailability($name, $value) {
    $col = ['username'=>'username', 'password' => 'password', 'email' => 'email'];
    $sql = "SELECT * FROM users WHERE $col[$name]";
    $stmt = $this->db->prepare($sql . ' = :colValue');
    $stmt->bindParam(':colValue', $value, PDO::PARAM_STR);
    $stmt->execute();
    return $stmt->fetch() ? false : true;
  }

  // Generates a random password
  // Source: https://gist.github.com/zyphlar/7217f566fc83a9633959
  public function randomPassword($length) {
    $bytes = openssl_random_pseudo_bytes($length + 1, $strong);
    if (false !== $bytes && true === $strong) {
      return substr(preg_replace("/[^a-zA-Z0-9]/", "", base64_encode($bytes)),0,$length);
    }
    else {
      throw new \Exception("Unable to generate secure token from OpenSSL.");
    }

  }

  // Static functions
  // Returns user information, false if user is not logged in
  public static function getUser($key = 'username') {
    Helper::startSession();
    return isset($_SESSION['user']) ? $_SESSION['user'][$key] : false;
  }

  // Protected
  protected function addUserToSession($user) {
    $_SESSION['user'] = [
        'id' => $user['id'],
        'username' => $user['username'],
        'roleId' => $user['role_id'],
        'email' => $user['email']
    ];
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



}

