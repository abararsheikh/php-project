<?php
/**
 * @Author Yi Zhao
 *
 */

namespace Project\Classes;


class NavGroup {
  public $navs = [];

  public function group() {
    $this->navs[] = func_get_args();
  }
}