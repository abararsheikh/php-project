<?php
require_once ' ';

class EmailValidator extends Validator {
    public function EmailValidator($email) {
        if (preg_match( "/^[_.0-9a-z-a-z-]+@([0-9a-z][0-9a-z-]+.)+[a-z]{2,4}$/",$email)) {
            print ' ';  //print
        }else{
            print 'wrong email address';
            return false;
        }
    }
    public  function  display(){


    }
}


