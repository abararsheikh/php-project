<?php
/**
 * Created by PhpStorm.
 * User: yi
 * Date: 15/04/16
 * Time: 4:21 PM
 */


use Project\Auth\models\AuthModel;
use Project\Classes\Request;
use Project\Classes\View;

class AdminController {

  public function __construct() {
    $this->model = new AuthModel();
    $this->view = new View([
        'css' => [
            '/Assets/css/bootstrap.min.css',
            '/Assets/css/admin.css',

        ],
        'js' => [
            '/Assets/js/jquery.min.js',
            '/Assets/js/bootstrap.min.js',
            '/jspm_packages/system.js',
            '/config.js'
        ],
        'header' => '/Admin_Login/admin/admin_header.php',
        'footer' => '/Auth/Views/footer.php'
    ]);
  }

  public function home(Request $request) {
    //var_dump($request);
    return $this->view->render('/Admin_Login/admin/test', 'Admin Home');
  }

  public function news() {
    return $this->view->render('/FilmAdmin_CMS/View/IndexMovies_AdminView', 'Admin news');
  }





}