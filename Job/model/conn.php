<?php

error_reporting(0);
$dsn = 'mysql:host=localhost;dbname=webadmin';
$username = 'root';
$password = '';
require('./model/PDOOperation.php');
// try {
$db = new PDO($dsn, $username, $password);




?>
