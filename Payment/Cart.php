<?php
/**
 * @Author Yi Zhao
 *
 */

namespace Project\Payment;


class Cart {


  public static function add(array $item) {
    $_SESSION['cart'][] = $item;
  }

  public static function remove($index) {
    unset($_SESSION['cart'][$index]);
  }

  public static function items() {
    return $_SESSION['cart'];
  }

}