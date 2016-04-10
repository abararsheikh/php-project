<?php
require_once "Database.php";
class ShoppingcartDB
{
   private static $db;
    public static  function getCartByUserId($id){
        self::$db=Database::getDB();

        $query="select a.Food_id,b.Food_Image,b.Food_description,b.Food_Catagory,b.Food_Price,b.Discount_price,
a.Quantity,a.Size,b.Food_Instock,b.Food_Name,a.Cinema_Name,a.Id from food_shoppingcart a
join food b on a.Food_id=b.Food_id where a.User_id='$id'";
        $result=self::$db->query($query);
        $results=$result->fetchAll(PDO::FETCH_OBJ);

       return $results;
    }
    public static function insertItemById($foodid,$userid,$quantity,$size,$cinema){
        self::$db=Database::getDB();
        $items=self::getCartByUserId($userid);

        foreach($items as $item){
            if($item->Food_id==$foodid){
                $count=self::updateItemById($foodid,$userid,$quantity,$size,$cinema);
                return $count;
            }
        }
        $query="insert into food_shoppingcart (User_id,Food_id,Quantity,Size,Cinema_Name)
        VALUES ('$userid','$foodid','$quantity','$size','$cinema')";
        $count=self::$db->exec($query);

        return $count;
    }
    public static function updateItemById($foodid,$userid,$quantity,$size,$cinema){
        self::$db=Database::getDB();
        $query="update food_shoppingcart set Quantity='$quantity',Size='$size',Cinema_Name='$cinema'
        where User_id='$userid'and Food_id='$foodid'";
       $count=self::$db->exec($query);
        return $count;
    }
    public static function deleteById($cartId){
        self::$db=Database::getDB();
        $query="delete from food_shoppingcart where Id='$cartId'";
        $count=self::$db->exec($query);
        return $count;

    }
}