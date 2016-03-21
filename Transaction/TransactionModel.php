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
    $stmt = $this->db->prepare("INSERT INTO transactions VALUES ($this->userId, $this->item, $this->cost, false, time())");
    if($stmt->execute()) {

      return true;
    }
    // if insert fails
    return false;

  }
}