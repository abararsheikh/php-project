<?php
// initialize all the varibale to connect to database
$db_hostname = "localhost";
$db_username = "root";
$db_password = "";
$db_database_name = "movies";

//Create my SQL connection
//This will give you successfull connection if all the status are true
$db_connection = mysqli_connect($db_hostname,$db_username,$db_password,$db_database_name) or die;

//Check for above connection

if(mysqli_connect_error())
{
    echo "Failed to connect to databse";
}

//echo "Connection is successfull";

