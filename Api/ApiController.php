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

  ///////////////////////////////

  // PUT /page/:id
  public function UpdatePage($id, Request $request) {
    $result = Page::update($id, $request->param('content'), $request->param('link'));
    $this->view->json($this->resultArray($result, null));
  }

  // GET /page/:id
  public function GetPage($id) {
    $info = Page::get($id);
    $this->view->json($info);
  }

  // DELETE /page/:id
  public function DeletePage($id) {
    $result = Page::delete($id);
    $this->view->json($this->resultArray($result, null));
  }

  // POST /page
  public function AddPage(Request $request) {
    $result = Page::add($request->param('content'), $request->param('link'));
    $this->view->json(['success' => $result, 'id' => Page::getLastId()]);
  }

}