<?php

namespace Project\Transaction;


use Project\Classes\Controller;
use Project\Classes\View;

class TransactionController extends Controller{

  public function __construct() {
    $this->model = new TransactionModel();
    $this->view = new View();
  }

  public function NewTransaction() {
    
    
  }

  public function Checkout() {

  }
}