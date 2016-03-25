<?php
/**
 * Created by PhpStorm.
 * User: ran
 * Date: 3/17/2016
 * Time: 7:59 PM
 */

class ShoppingCart{
    public $shoppingCart;
    public function __construct(){
        //$this->showCart();
        $this->shoppingCart = new Session('cart');
//        if(count($this->shoppingCart)==0) {
//
//            $this->shoppingCart->data = [
//                "Order_Id" => "",
//                "Seat_number"=>"",
//                "running_films_id"=>"",
//                "Run_Time"=>"",
//                "Cinema_Name"=>"",
//                "Room_Name"=>"",
//                "Cinema_Address"=>"",
//                "Seats_Number"=>""
//
//            ];
//        }
    }

    public function addToCart($item){
       // var_dump($this->shoppingCart->data);
        $this->shoppingCart->data[]=$item;
    }

    public function deleteItem($item_id){
        if(isset($this->shoppingCart->data[$item_id])){
                unset($this->shoppingCart->data[$item_id]);
            $this->shoppingCart->data = array_values($this->shoppingCart->data);
        }
    }

    public function emptyCart(){
        $this->shoppingCart->data=[];
    }

    public function showCart(){
        var_dump($this->shoppingCart->data);
    }
    public function getItemById($item_id){
        if(isset($this->shoppingCart->data[$item_id])) {
            return $this->shoppingCart->data[$item_id];
        }else{
            return false;
        }
    }

    public function updateCartByItemId($item_id, $item){
        $this->shoppingCart->data[$item_id] = $item;
    }

    public function isEmpty(){
        return empty($this->shoppingCart->data)==true? true: false;
    }




}