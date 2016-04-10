
<?php

$rating_tableName  = 'ratings';
$rating_unitwidth  = 15;
$rating_dbname  = 'php_project';
$units=5;

$dsn = 'mysql:host=localhost;dbname=php_project';
$username = 'root';
$password = '';

try{
    $db = new PDO($dsn,$username,$password);
    // disable emulated prepared statment
    $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //echo "connected" ." <br/>";
}
catch(PDOException $e)
{
    $error_message = $e->getMessage();

    echo $error_message;

}

?>

