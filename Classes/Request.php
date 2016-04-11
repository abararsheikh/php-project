<?php

namespace Project\Classes;


class Request {
  private $params;
  public $method;

  public function __construct() {
    $this->params = $_REQUEST;
    $this->method = $_SERVER['REQUEST_METHOD'];
    if ($this->method !== 'GET' || 'POST') {
      $str = file_get_contents("php://input");
      parse_str($str, $params);
//      $params = json_decode($str, true);
      $this->params = $params;
    }
  }

  public function param($key) {
    $value = $this->params[$key];
    if (is_array($value)) return $value;
    return ($value);
  }

}