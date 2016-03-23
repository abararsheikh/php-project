<?php

//config
require_once "./config.php";

//DB

//SELECT Film_Name, `LANGUAGE`, DATE_FORMAT(Run_Time, '%d-%M-%Y') FROM `films` JOIN running_films ON films.Film_Id = running_films.Film_Id
    require_once "../autoloader.php";

    use Project\MovieCalender\libs\Router;
    new Router();
?>



