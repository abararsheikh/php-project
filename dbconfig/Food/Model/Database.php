<?php

class Database
{
    private static $db;
    private static $dsn="mysql:host=localhost;dbname=aircmiao_yi_phpproject";
    private static $username="aircmiao_yi_php";
    private static $password="a12345";
    public static function getDB(){
       if(!isset(self::$db)) {
           try {
               self::$db = new PDO(self::$dsn, self::$username, self::$password);
           } catch (PDOException $e) {
               $error_message = $e->getMessage();
               include "../Errors/DatabaseError.php";
               exit();
           }
       }
        return self::$db;
    }
    public function __construct()
    {

    }

}