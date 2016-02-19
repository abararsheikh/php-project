<?php
namespace Project\Auth;
use Project\Classes as Classes;

/**
 * @Author Yi Zhao
 *
 */
class AuthController extends Classes\Controller {
  private $view;
  private $model;
  public function __construct() {
    $this->model = new AuthModel();
    $this->view = new Classes\View();
  }

  public function loginPage() {
    if ($this->model->logInViaCookie()) {
      $this->view->text('login success as ' . AuthModel::getUser());
    }else {
      $this->view->render('/Auth/login', 'Login Page');
    }
  }
  // need validation
  public function processLogin() {
    $data = $_POST;
    $loginResult = $this->model->logIn($data['username'], $data['password']);
    if($loginResult) {
      $this->view->text("logged in successful as " . AuthModel::getUser());
    }else {
      $this->view->text('login fail');
    }
  }

  public function logout() {
    $this->model->logOut();
    $this->view->text('logout');
    var_dump($_SESSION);
  }
}