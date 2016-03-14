<?php

namespace Project\Auth\controllers;


use Project\Auth\models\AuthModel;
use Project\Auth\models\GitHub;
use Project\Auth\models\OAuthModel;
use Project\Classes\Config\OAuthInfo;
use Project\Classes\Controller;
use Project\Classes\View;

class OAuthController extends Controller{
  private $model;
  private $view;

  public function __construct() {
    $this->view = new View();
    $this->model = new OAuthModel();
  }

  public function github() {
    $gitHub = new GitHub(OAuthInfo::GITHUB);
    if($gitHub) {
      $this->model->logIn('github', $gitHub->getUser(), $gitHub->getEmail());
      $this->view->json($this->resultArray(true, ''));
    }else {
      $this->view->json($this->resultArray(false, 'login failed'));
    }
  }
}