<?php

namespace Project\Auth\models;


use PDO;
use Project\Classes\DB\DB;

class RegisterModel {

  public function __construct() {
    $this->db = DB::getDB();
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
}