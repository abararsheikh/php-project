<body style="background-color:#CEF6D8;">
<?php
include 'dbconnect.php';

$sel_record = $_POST['sel_record'];

//SQL  statment to select information based on delete button click

$sql = "SELECT *  FROM contactus WHERE contact_id = $sel_record";

// Execute the sql query and get the result

$result = mysqli_query($db_connection,$sql) or die(mysqli_error($db_connection));

if(!$result)
{
    print "Something has gone wrong ! Try again !!!!";
}
else {
    // loop through record and get values

    while ($records = mysqli_fetch_array($result)) {
        // get the data from database and use this data as value to print on the textbox
        $contact_id = $records["contact_id"];
        $first_name = $records["first_name"];
        $last_name = $records["last_name"];
        $Email = $records["Email"];
        $Message = $records["Message"];

    }   // End of while loop

echo "<h2>Are you sure you want to delete this record !! ? </h2>

<ul>
<li>Contact Id : $contact_id</li>
<li> Firstname: $first_name </li>
<li> Lastname: $last_name </li>
<li>Email : <a href=\"mailto:$Email\"> $Email</a></li>
<li> Message : $Message</li>
</ul>
<p>
<br/>

<form action='confirmdelete.php' method='post'>
<input type='hidden' name='confirmid' value='$contact_id'>
<input type='submit' name ='confirmdelete' value='confirm delete'/>
<input type ='button' name='cancel' value ='cancel' onclick= ' location.href =\"displaycontact.php\" '/>

</form>


</p>


";
}


