<?php
/**
 * Created by PhpStorm.
 * User: ran
 * Date: 3/6/2016
 * Time: 11:14 PM
 */

require_once "../config.php";
require_once "../../autoloader.php";
//require './libs/phpMailer/PHPMailerAutoload.php';
use \Project\FAQ\Admin\libs\Router;


new Router();

$faq = new \Project\FAQ\Admin\Models\FAQAdminModels();

