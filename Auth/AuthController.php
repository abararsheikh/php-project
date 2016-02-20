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
      echo ('logged in as ' . AuthModel::getUser());
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
    $this->view->json($this->resultArray(AuthModel::getUser(), 'You have not logged in yet'));

  }
  public function registerPage() {
    $this->view->render('/Auth/register', 'Register');
  }
  public function registerUser() {
    $v = new Validator($_POST);
    $v->validate('username', ['notEmpty']);
    $v->password()->validate('password', [
      'password',
      ['equal', $v->getKey('repeatPassword')]
    ]);
    $v->email()->validate('email', [
      'notEmpty',
      'EmailValidator'
    ]);
    if ($v->isValid()){
      $result = $this->model->newUser($_POST['username'], $_POST['password'], $_POST['email']);
      $this->view->json($this->resultArray ($result['success'], $result['error'] ));
    }else {
      $this->view->json($this->resultArray (false, $v->getErrors() ));
    }
  }
}