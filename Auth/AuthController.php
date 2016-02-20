<?php
namespace Project\Auth;
use Project\Classes as Classes;
use Project\Validation\Validator;

/**
 * @Author Yi Zhao
 *
 */
class AuthController extends Classes\Controller {
  private $view;
  private $model;
  public function __construct() {
    $this->model = new AuthModel();
    $this->view = new Classes\View([
      'css' => '/css/bootstrap.min.css'
    ]);
  }

  public function loginPage() {
    if ($this->model->logInViaCookie()) {
      $this->view->text('logged in as ' . AuthModel::getUser());
    }else {
      $this->view->render('/Auth/login', 'Login Page');
    }
  }
  public function processLogin() {
    $output = [ 'success' => false, 'error' => [] ];
    $loginResult = $this->model->logIn($_POST['username'], $_POST['password']);
    if($loginResult) {
      $output['success'] = true;
    }else {
      $output['error'][] = 'username or password is not correct';
    }
    $this->view->json($output);
  }
  public function logout() {
    $this->model->logOut();
    $this->view->text('logout');
  }
  public function registerPage() {
    $this->view->render('/Auth/register', 'Register');
  }
  // TODO: Add validation
  public function registerUser() {
//    $v = new Validator($_POST);
    $result = $this->model->newUser($_POST['username'], $_POST['password'], $_POST['email']);
    $this->view->json($this->resultArray($result, 'validation error messages here'));
  }
}