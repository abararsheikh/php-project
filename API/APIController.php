<?php
/**
 * @Author Yi Zhao
 *
 */

namespace Project\API;


use Project\Classes\View;

class APIController {
  private $view;

  public function __construct() {
    $this->view = new View();
  }

  // get current user profile
  public function userInfo() {

  }
  // shopping cart
  public function cart() {

  }


}