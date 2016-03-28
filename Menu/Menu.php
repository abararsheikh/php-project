<?php

namespace Project\Menu;


use Project\Classes\DB\DB;

class Menu {

  private $db;
  private $menu;

  public function __construct() {
    $this->db = DB::getDB();
  }

  public static function getMenuAll() {
    $menuList = DB::find('SELECT * FROM menus', null);
    return $menuList;
  }
  public static function saveMenu(array $menus) {
    $stmt = DB::getDB()->prepare('INSERT INTO menus VALUES (:name, :menu)');
    foreach ($menus as $menu) {
      $stmt->bindParam(':name', htmlspecialchars($menu['name']), \PDO::PARAM_STR);
      $stmt->bindParam(':menu', htmlspecialchars($menu['menu']), \PDO::PARAM_STR);
      $stmt->execute();
    }
  }
}