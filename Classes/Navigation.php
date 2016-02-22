<?php

namespace Project\Classes;
/**
 * Class Navigation
 * It provides a simplified add method to do routing.
 * Remember to call start if need to use menu items for router.
 * Example:
 *  $nav = new Navigation()
 *  $nav->add('/movies as Movie List', [header.php, content.php, footer.php])
 * It adds an item to menu called 'Movie List' and the link to it is '/movies.
 * It also tell router to include files in the array if routing is necessary.
 *
 *
 * @package Project\Classes
 * @Author Yi Zhao
 */
class Navigation extends Router {
  public $items = [];
  private $name = '';

  public function __construct($name, $baseDir = null) {
    parent::__construct($baseDir);
    $this->name = $name;
  }
  public function getName(){ return $this->name; }

  // TODO: make register more efficient
  public function add($pathAsName, $pageOrAction, $andPost = false) {
    $pageOrAction = is_callable($pageOrAction) ? $pageOrAction : $this->render($pageOrAction);
    $this->routes[] = $this->quickAdd($pathAsName, $pageOrAction, 'GET');
    if ($andPost) {
      $this->routes[] = $this->quickAdd($pathAsName, $pageOrAction, 'POST');
    }
    $this->registerMenu();
  }
  public function displayNav($tag = 'li') {
    foreach ($this->items as $item) {
      $link = $item['link'];
      $name = $item['name'];
      echo "<$tag><a href='$link'>$name</a></$tag>";
    }
  }
  private function registerMenu() {
    $onlyGetMethod = function (Route $route) {
      return $route->getProp('method') == 'GET';
    };
    $makeNavItem = function (Route $route) {
      return [
        'link' => $route->getProp('path'),
        'name' => $route->getProp('name'),
      ];
    };
    $this->items = array_map($makeNavItem, array_filter($this->routes, $onlyGetMethod));
    Navs::addNav($this);
  }
  private function render($content) {
    return function() use($content){
      echo View::addContent($content);
    };
  }

}
