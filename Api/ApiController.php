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
    $menus = Menu::getMenuAll();
    $menuName = Helper::getParam('name', INPUT_GET);
    if (isset($menuName)) {
      foreach ($menus as $menu) {
        if ( $menu['name'] == $menuName ) return $this->view->json($menu['menu']);
      }
      $this->view->json($this->resultArray(false, 'no such menu'));
    }else {
      $this->view->json($menus);
    }
  }

  public function SaveMenu() {
    $result = Menu::saveMenu($_POST['menu']);

    $this->view->json($this->resultArray($result, null));
  }
}