<?php

namespace Project\Auth\models;


use Project\Classes\Helper;
use Project\Classes\Request;

class GitHub {
  private $access_token = '';
  private $client_id = '';
  private $client_secret = '';
  private $token_url = '';
  private $apiUrl = 'https://api.github.com/user';

  public function __construct($options) {
    $this->client_id = $options['client_id'];
    $this->client_secret = $options['client_secret'];
    $this->token_url = $options['tokenUrl'];
  }

  public function getUser() {
    return json_decode(Request::get($this->apiUrl, ['access_token' => $this->access_token]), true)['login'];
  }

  public function getEmail() {
    return json_decode(Request::get("$this->apiUrl/emails", ['access_token' => $this->access_token]), true)[0]['email'];
  }

  public function connect() {
    header("Location: https://github.com/login/oauth/authorize?scope=user:email&client_id=76410de7fda4780c4caa");
  }
  // need to handle errors
  public function getToken() {
    $code = Helper::getParam('code', INPUT_GET);
    $data = array(
        'client_id' => $this->client_id,
        'client_secret' => $this->client_secret,
        'code' => $code,
    );
    $response = Request::post($this->token_url, $data, Request::HEADER_OAUTH);
    if (!$response) return false;
    $this->access_token = json_decode($response, true)['access_token'];
    return true;
  }


}