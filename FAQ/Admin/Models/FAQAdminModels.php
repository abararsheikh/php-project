<?php
/**
 * Created by PhpStorm.
 * User: ran
 * Date: 4/20/2016
 * Time: 3:29 PM
 */

namespace Project\FAQ\Admin\Models;


use Project\FAQ\Models\FAQModel;

class FAQAdminModels extends FAQModel
{
    private $db;
    public function __construct()
    {
        $this->db = new PDOOperation(DATA_SOURCE_NAME, DB_USERNAME, DB_PASSWORD);
    }

    public function Faq(){

    }
}