<?php

require_once "Database.php";


class FoodDB
{
    private static $db;
public static function getAll(){

  self::$db=Database::getDB();
  $query="select * from food";
    $results=self::$db->query($query);
  $result = $results->fetchAll(PDO::FETCH_ASSOC);

  /*  $all=array();
    foreach($results as $item){
        $food=new Food($item["Food_Catagory"],$item["Food_Price"],$item["Food_Instock"],
            $item["Food_description"],$item["Food_mark"],$item["Food_Name"],$item["Food_Image"],
            $item["Discount_price"],$item["Viewed_times"],$item["Sales_volume"]);
        $food->setId($item["Food_id"]);
        $all[]=$food;
    }*/


    return json_encode($result);

}
    public static function getFoodsByCatagory($catagory){
        self::$db=Database::getDB();
        $query="select * from food where Food_Catagory ='$catagory'";
        $results=self::$db->query($query);
        $result = $results->fetchAll(PDO::FETCH_ASSOC);

     /*   $all=array();
        foreach($results as $item){
            $food=new Food($item["Food_Catagory"],$item["Food_Price"],$item["Food_Instock"],
                $item["Food_description"],$item["Food_mark"],$item["Food_Name"],$item["Food_Image"],
                $item["Discount_price"],$item["Viewed_times"],$item["Sales_volume"]);
            $food->setId($item["Food_id"]);
            $all[]=$food;
        }*/

        return json_encode($result);
    }
    public static function getTopFoods($count){
        self::$db=Database::getDB();
        $query="select * from food order by Sales_volume DESC limit $count";
        $results=self::$db->query($query);
        $all=array();

        foreach($results as $item){
            $food=new Food($item["Food_Catagory"],$item["Food_Price"],$item["Food_Instock"],
                $item["Food_description"],$item["Food_mark"],$item["Food_Name"],$item["Food_Image"],
                $item["Discount_price"],$item["Viewed_times"],$item["Sales_volume"]);
            $food->setId($item["Food_id"]);
            $all[]=$food;
        }

        return $all;
    }
    public static function pages($foods){
      if(count($foods)%12==0){
          $page=count($foods)/12;
      }else{
          $page=(count($foods)-count($foods)%12)/12+1;
      }
        return $page;
    }
    public static function search($search){
       $foods= json_decode(self::getAll());
        $pattern="/".$search."/i";
        $selected=array();

            foreach ($foods as $food) {
                if (preg_match($pattern, $food->Food_Name)) {
                    $selected[] = $food;
                }

            }


        return json_encode($selected);
    }
    public static function getFoodById($id){
        self::$db=Database::getDB();
        $query="select * from food where Food_id='$id'";
        $result=self::$db->query($query);

        $item=$result->fetch();

        $food=new Food($item["Food_Catagory"],$item["Food_Price"],$item["Food_Instock"],
            $item["Food_description"],$item["Food_mark"],$item["Food_Name"],$item["Food_Image"],
            $item["Discount_price"],$item["Viewed_times"],$item["Sales_volume"]);
        $food->setId($item["Food_id"]);
        return $food;
    }
    public static function getFoodCinema(){
        self::$db=Database::getDB();
        $query="select * from cinemas";
        $result=self::$db->query($query);
        $results = $result->fetchAll(PDO::FETCH_ASSOC);
        return $results;
    }
    public static function  getFoodCommentById($id){
        self::$db=Database::getDB();
        $query="select b.Comment,b.Date,c.username,b.Mark,b.Evaluation from food a join food_comment b on a.Food_id=
         b.Food_id join users c on b.User_id=c.id where a.Food_id='$id'";
        $result=self::$db->query($query);
        $results = $result->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($results);
    }
    public static function setHistory($foodid){
        $t=time();

        if(isset($_COOKIE[$foodid])){


            setcookie($foodid, $t,$t + (86400 * 30),"/");

        }else {
            setcookie($foodid, $t,$t + (86400 * 30),"/");
        }

    }
}