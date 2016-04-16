<?php

namespace Project\Api;

use Project\Classes\Controller;
use Project\Classes\Request;
use Project\Classes\View;
use Project\Menu\Menu;

class MenuController extends Controller{
  protected $model;
  protected $view;

  public function __construct() {
    $this->view = new View();
  }

  // GET /menu/:name
  public function Menu($name) {
    $menus = Menu::getMenuAll();
    if (isset($name)) {
      foreach ($menus as $menu) {
        if ( $menu['name'] == $name ) return $this->view->json($menu['menu']);
      }
      $this->view->json($this->resultArray(false, 'no such menu'));
    }
  }

  // GET /menu
  public function MenuAll() {
    $menus = Menu::getMenuAll();
    $this->view->json($menus);
  }

  // POST /menu
  public function SaveMenu(Request $request) {
    $result = Menu::saveMenu($request->param('menu'));
    $this->view->json($this->resultArray($result, null));
  }


}