<?php

namespace Project\Api;


use Project\Classes\Controller;
use Project\Classes\Request;
use Project\Classes\View;
use Project\Menu\Page;

class PageController extends Controller{

  public function __construct() {
    $this->view = new View();
  }

  // PUT /page/:id
  public function UpdatePage($id, Request $request) {
    $result = Page::update($id, $request->param('content'), $request->param('name'), $request->param('link'));
    return $this->view->json($this->resultArray($result, null));
  }

  // GET /page/:id
  public function GetPage($id) {
    $info = Page::get($id);
    return $this->view->json($info);
  }

  // GET /page
  public function GetAll() {
    return $this->view->json(Page::getAll());
  }

  // DELETE /page/:id
  public function DeletePage($id) {
    $result = Page::delete($id);
    return $this->view->json($this->resultArray($result, null));
  }

  // POST /page
  public function AddPage(Request $request) {
    $result = Page::add($request->param('content'), $request->param('name'), $request->param('link'));
    return $this->view->json(['success' => $result, 'id' => Page::getLastId()]);
  }

}