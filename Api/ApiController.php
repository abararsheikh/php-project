<?php

namespace Project\Api;

use Project\Classes\Controller;
use Project\Classes\Helper;
use Project\Classes\Request;
use Project\Classes\View;
use Project\Menu\Menu;
use Project\Menu\Page;

class ApiController extends Controller{
  protected $model;
  protected $view;

  public function __construct() {
    $this->view = new View();
  }

  public function Menu($name) {
    $menus = Menu::getMenuAll();
    if (isset($name)) {
      foreach ($menus as $menu) {
        if ( $menu['name'] == $name ) return $this->view->json($menu['menu']);
      }
      $this->view->json($this->resultArray(false, 'no such menu'));
    }else {
      $this->view->json($menus);
    }
  }
  public function MenuAll() {
    $menus = Menu::getMenuAll();
    $this->view->json($menus);
  }

  public function SaveMenu(Request $request) {
    $result = Menu::saveMenu($request->param('menu'));
    $this->view->json($this->resultArray($result, null));
  }

  public function UpdatePage(Request $request) {
    $result = Page::update($request->param('id'), $request->param('content'), $request->param('link'));
    $this->view->json($this->resultArray($result, null));
  }

  public function GetPage($id) {
    $info = Page::get($id);
    $this->view->json($info);
  }

  public function DeletePage(Request $request) {
    $result = Page::delete($request->param('id'));
    $this->view->json($this->resultArray($result, null));
  }

  public function AddPage(Request $request) {
    $result = Page::add($request->param('content'), $request->param('link'));
    $this->view->json($this->resultArray($result, null));
  }

}