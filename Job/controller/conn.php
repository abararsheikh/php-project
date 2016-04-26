<?php
error_reporting(0);
$dsn = 'mysql:host=localhost;dbname=aircmiao_yi_phpproject';
$username = 'aircmiao_yi_php';
$password = 'a12345';

// try {
$db = new PDO($dsn, $username, $password);

include("../model/PDOOperation.php");


?>
