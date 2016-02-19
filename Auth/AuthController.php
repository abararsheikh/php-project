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
    $this->view->render('/Auth/login', 'Login Page');
  }
  public function processLogin() {
    $data = $_POST;
    $this->view->json($data);
  }

  public function logout() {
    $this->view->text('logout');
  }
}