<body style="background-color:#CEF6D8;">
<?php
include 'dbconnect.php';

$sel_record = $_POST['sel_record'];

//SQL  statment to select information based on edit button

$sql = "SELECT *  FROM contactus WHERE contact_id = $sel_record";

// Execute the sql query and get the result

$result = mysqli_query($db_connection,$sql) or die(mysqli_error($db_connection));

if(!$result)
{
    print "Something has gone wrong ! Try again !!!!";
}
else
{
    // loop through record and get values

    while($records = mysqli_fetch_array($result))
    {
        // get the data from database and use this data as value to print on the textbox
        $contact_id =  $records["contact_id"];
        $first_name = $records["first_name"];
        $last_name =  $records["last_name"];
        $Email = $records["Email"];
        $Message = $records["Message"];

        echo "

                <form method =\"post\" action =\"update.php\">
                    <input type =\"hidden\" name = \"id\" value=\"$contact_id\">

                        <div>
                            <label for =\"firstname\">First name</label>
                            <input type='text' name =\"firstname\" value =\"$first_name\">
                        </div>
                        <div>
                            <label for =\"lastname\">Last name</label>
                            <input type='text' name =\"lastname\" value =\"$last_name\">
                        </div>
                        <div>
                            <label for =\"email\">Email</label>
                            <input type='text' name =\"email\" value =\"$Email\">
                        </div>
                        <div>
                            <label for =\"message\">Message</label>
                            <input type='text' name =\"message\" value =\"$Message\">
                        </div>

                        <br>

                        <div id =\"mysubmit\">
                            <input type =\"submit\" name = \"submit\" value =\"Modify record\">
                        </div>
                </form>



";
    }
    // end while loop
}