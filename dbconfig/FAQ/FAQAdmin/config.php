<?php
/**
 * Created by PhpStorm.
 * User: ran
 * Date: 3/6/2016
 * Time: 10:15 AM
 */


//DB
define('DATA_SOURCE_NAME','mysql:host=localhost;dbname=aircmiao_yi_phpproject');
define('DB_USERNAME','aircmiao_yi_php');
define('DB_PASSWORD','a12345');


//Router
define('DEFAULT_ROUTE','FAQAdminController/index');
define('DEFAULT_NAMESPACE',"Project\\FAQ\\FAQAdmin\\Controllers\\");

//UpLoadFile path
define('DEFAULT_IMAGE_PATH','../images/');
define('DEFAULT_FILE_PATH','../files/faq/');
?>