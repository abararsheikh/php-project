<?php

namespace Project\Classes;


class Request {
  private $params;
  public $method;

  public function __construct() {
    $this->params = $_REQUEST;
    $this->method = $_SERVER['REQUEST_METHOD'];
  }

  public function param($key) {
    $value = $this->params[$key];
    if (is_array($value)) return $value;
    return htmlspecialchars($value);
  }

}