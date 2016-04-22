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

        ],
        'header' => '/Admin_Login/admin/admin_header.php',
        'footer' => '/Auth/Views/footer.php'
    ]);
    $this->view->setTemplate("
      <html>
      <head>
        <title>%title%</title>
        %css%
        %js%
      </head>
      <body>
        %header%
        <div class='content'>
            %content%
        </div>
        %footer%
      </body>
      </html>
    ");
  }

  public function home() {

    return $this->view->render('/Admin_Login/admin/test', 'Admin Home');
  }

  public function movies() {
    return $this->view->render('/FilmAdmin_CMS/View/IndexMovies_AdminView', 'Admin movie');
  }

  public function contact() {
    return $this->view->render('/contact _us_page/View/displaycontact', 'Admin contact');
  }

  public function rating() {
    return $this->view->render('/Rating_System/Rating_Admin/View/Ratings_Index', 'Admin rating');
  }



}