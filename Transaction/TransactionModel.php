<?php

namespace Project\Transaction;

use Project\Auth\models\AuthModel;
use Project\Classes\DB\DB;

class TransactionModel {
  private $userId;
  private $item = [];
  private $cost = 0;
  private $db;

  public function __construct($item, $cost) {
    $this->userId = AuthModel::getUser('id');
    $this->item = json_encode($item);
    $this->cost = $cost;
    $this->db = DB::getDB();
  }

  public function add() {
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
