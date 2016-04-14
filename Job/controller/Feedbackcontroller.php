<?php

/**
 * 
 */
 class feedback{
 	
 	public function index(){
 		
 	if(isset($_POST['send'])){
    $username1 = $_POST['UserName1'];
    $phone = $_POST['Phone'];
    $email = $_POST['email'];
    $address = $_POST['address'];
    $message = $_POST['message'];
// Validate inputs\
    //var_dump($_POST);

    if (empty($username1) || empty($phone) || empty($email)|| empty($address)|| empty($message) ) {
        $error = "Invalid data. Check all fields and try again.";
    } else {
      
        $query = "INSERT INTO feedback (username, phone, email,address,message) VALUES ('$username1', '$phone', '$email', '$address','$message')";
        $db->exec($query);
        echo '信息插入成功';

    }
}

 		
 	}


}

?>