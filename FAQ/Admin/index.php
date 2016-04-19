<?php
/**
 * Created by PhpStorm.
 * User: ran
 * Date: 3/6/2016
 * Time: 11:14 PM
 */

require_once "config.php";
require_once "../autoloader.php";
require './libs/phpMailer/PHPMailerAutoload.php';
use \Project\FAQ\libs\Router;

new Router();
//ce_Full, running_films.Room_ID, DATE_FORMAT(Run_Time, '%H:%i') as Run_Time,DATE_FORMAT(Run_Time, '%W %M %Y') as Run_Date, cinemas.Cinema_Name, cinemas.Cinema_Address FROM films JOIN running_films ON films.Film_Id = running_films.Film_Id JOIN rooms ON running_films.Room_ID = rooms.Room_ID JOIN cinemas ON cinemas.Cinema_ID = rooms.Cinema_ID WHERE running_films.Film_Id=2