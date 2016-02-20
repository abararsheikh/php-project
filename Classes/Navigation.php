<?php
/**
 *
 *
 * @Author Yi Zhao
 *
 */

namespace Project\Classes;


class Navigation {
  public $items = [];

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
