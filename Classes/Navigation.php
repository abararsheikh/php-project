<?php
/**
 *
 *
 * @Author Yi Zhao
 *
 */

namespace Project\Classes;


class Navigation extends Router {
  public $items = [];

  public function add($pathAsName, $pageOrAction) {
    $pageOrAction = is_callable($pageOrAction) ? $pageOrAction : $this->render($pageOrAction);

    $this->routes[] = $this->quickAdd($pathAsName, $pageOrAction, 'GET');
  }

  private function render($content) {
    return function() use($content){
      echo View::addContent($content);
    };
  }

  public function register(array $routes) {
    foreach ($routes as $route) {
      $this->items[] = [
        'link' => $route['path'],
        'name' => $route['name'],
      ];
    }
  }

  public function displayNav($tag) {
    foreach ($this->items as $item) {
      $link = $item['link'];
      $name = $item['name'];
      echo "<$tag><a href='$link'>$name</a></$tag>";
    }
  }



}
