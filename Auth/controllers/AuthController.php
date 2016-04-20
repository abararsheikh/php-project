<?php
namespace Project\Auth\controllers;

use Project\Auth\models\AuthModel;
use Project\Classes\Controller;
use Project\Classes\View;

/**
 * @Author Yi Zhao
 *
 */
class AuthController extends Controller {

  protected $view;

  public function __construct() {
    $this->model = new AuthModel();
    $this->view = new View([
      'css' => [
        '/Assets/css/bootstrap.min.css',
      ],
      'js' => [
          '/Assets/js/jquery.min.js',
          '/Assets/js/bootstrap.min.js',
          '/jspm_packages/system.js',
          '/config.js'
      ],
      'header' => '/Auth/Views/header.php',
      'footer' => '/Auth/Views/footer.php'
    ]);

    // Set page template
    $this->view->setTemplate("
      <html>
      <head>
        <title>%title%</title>
        %css%
        %js%
      </head>
      <body>
        %header%
        %content%
        %footer%
      </body>
      </html>
    ");
  }

}