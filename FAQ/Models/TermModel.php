<?php
/**
 * Created by PhpStorm.
 * User: ran
 * Date: 4/10/2016
 * Time: 1:57 AM
 */

namespace Project\FAQ\Models;




use Project\FAQ\libs\PDOOperation;
use Project\FAQ\libs\TermsFileOperation;

class TermModel
{
    private $db;
    public function __construct(){
        $this->db = new PDOOperation(DATA_SOURCE_NAME,DB_USERNAME,DB_PASSWORD);
    }

    public function getAllTerms(){
        $query = "Select * From terms";
        $result = $this->db->query($query);

        $faqArray = [];
        foreach($result->rows as $row){
            $result = $this->buildResult($row);
            $faqArray[] = $result;
        }

        return $faqArray;

    }

    private function buildResult($row){
        // var_dump($row);
        $terms = new \stdClass();
        if(isset($row['info'])) {
            $fileName = $row['info'];
            $result = $this->getTermsFileInfo($fileName);
            $terms->answer = $result;

        }
        foreach($row as $key=>$value) {
            $terms->$key = $value;

        }
        return $terms;
    }

    private function getTermsFileInfo($fileName){
        $file = "./files/terms/$fileName";

        $faqAnswer = new TermsFileOperation();
        $answer = $faqAnswer->parseInfo($file);
        return $answer;
    }
}