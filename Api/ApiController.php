<?php

namespace Project\Api;

use Project\Classes\Controller;
use Project\Classes\Helper;
use Project\Classes\View;
use Project\Menu\Menu;

class ApiController extends Controller{
  protected $model;
  protected $view;

  public function __construct() {
    $this->view = new View();
  }

  public function Menu() {
    $this->view->json(Menu::getMenuAll());
  }

  public function SaveMenu() {
//    $menu = Helper::getParam('menu');
//    var_dump(json_encode($_POST['menu']));
    $result = Menu::saveMenu($_POST['menu']);

    $this->view->json($this->resultArray($result, null));
  }
}