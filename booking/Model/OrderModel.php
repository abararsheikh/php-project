<?php
/**
 * Created by PhpStorm.
 * User: ran
 * Date: 3/10/2016
 * Time: 1:44 AM
 */
class OrderModel
{
    public function __construct()
    {

    }

    public function getOrderDetailId($id)
    {
        $db = new PDOOperation(DATA_SOURCE_NAME, DB_USERNAME, DB_PASSWORD);
        $result = $db->query("SELECT * FROM Orders JOIN users
                                                    ON users.id = orders.Customer_Id
                                                    JOIN reservations
                                                    ON reservations.Order_Id = orders.Order_Id
                              WHERE Orders.Order_Id= :Order_Id;", $para = ["Order_Id" => $id]);

        $OrderInfo = [];
        foreach ($result->rows as $row) {
            if (is_array($row)) {
                $film = new stdClass();
                foreach ($row as $key => $value) {
                    $film->$key = $value;
                }


                $OrderInfo[] = $film;
            }


            return $OrderInfo;

        }
    }

        /*
         * get specific booking informations
         *
         *
         */

        function getOrderDetail($para, $query)
        {
            $db = new PDOOperation(DATA_SOURCE_NAME, DB_USERNAME, DB_PASSWORD);

            $result = $db->query($query, $para);
            //var_dump($result);


            $Order = [];
            foreach ($result->rows as $row) {
                if (is_array($row)) {
                    $film = new stdClass();
                    foreach ($row as $key => $value) {
                        $film->$key = $value;
                    }


                    $Order[] = $film;
                }

            }


            return $Order;
        }

        function modifyOrder($para, $query)
        {
            $db = new PDOOperation(DATA_SOURCE_NAME, DB_USERNAME, DB_PASSWORD);

            $result = $db->execute($query, $para);
        }

}