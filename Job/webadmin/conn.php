<?php
/*error_reporting(0);
$conn=mysql_connect("localhost","root","") or die("not connect!");
$db_charset='gbk';
mysql_query("SET character_set_client = 'binary', character_set_connection = '".$db_charset."', character_set_results = '".$db_charset."'");
mysql_select_db("webadmin") ;*/
error_reporting(0);
$dsn = 'mysql:host=localhost;dbname=webadmin';
$username = 'root';
$password = '';

// try {
$db = new PDO($dsn, $username, $password);




?>
