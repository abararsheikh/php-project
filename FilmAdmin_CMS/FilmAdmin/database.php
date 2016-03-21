<?php
$dsn = 'mysql:host=localhost;dbname=movies';
$username = 'root';
$password = '';

try{
    $db = new PDO($dsn,$username,$password);
    //echo "connected" ." <br/>";
}
catch(PDOException $e)
{
    $error_message = $e->getMessage();

    echo $error_message;
}

?>