<?php
error_reporting(0);
$dsn = 'mysql:host=localhost;dbname=php_project_all.sql';
$username = 'root';
$password = '';
require('model/PDOOperation.php');
// try {
$db = new PDO($dsn, $username, $password);


?>
