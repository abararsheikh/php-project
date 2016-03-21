<?php

namespace Project\Transaction;

use Project\Auth\models\AuthModel;
use Project\Classes\DB\DB;

class TransactionModel {
  private $userId;
  private $item = [];
  private $cost = 0;
  private $db;

  public function __construct() {
    $this->db = DB::getDB();
    $this->userId = AuthModel::getUser('id');
  }

  public function init() {
    $movieCart = [
      'cost' => 25.3,
      'items' => [
        'Name' => 'Star Wars'
      ]
    ];

    if (!empty($movieCart)) {
      $this->item = json_encode($movieCart['items']);
      $this->cost = $movieCart['cost'];
    }


  }

  public function save() {
    $stmt = $this->db->prepare("
      INSERT INTO transactions (user_id, items, cost, is_paid, time) 
      VALUES (:user_id, :items, :cost, 0, :time);
    ");
    $stmt->bindValue(':user_id', $this->userId, \PDO::PARAM_STR);
    $stmt->bindValue(':items', $this->item, \PDO::PARAM_STR);
    $stmt->bindValue(':cost', $this->cost, \PDO::PARAM_STR);
    $stmt->bindValue(':time', date("Y-m-d H:i:s"), \PDO::PARAM_INT);

    if($stmt->execute()) {

      return true;
    }
    // if insert fails
    return false;

  }
}
