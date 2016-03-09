<body style="background-color:#CEF6D8;">
<?php
//connect to database :
include 'dbconnect.php';

//once connected execute below query.
$sql = "SELECT * FROM contactus ORDER BY first_name ASC";
$result = mysqli_query($db_connection,$sql) or die(mysqli_error($db_connection));


?>

<h2>List of contacts</h2>

<?php

// fetch all the data from table and store in to array call $row[]
//It display list of array



while($row = mysqli_fetch_array($result))
{
    $contact_id =  $row["contact_id"];
    $first_name = $row["first_name"];
    $last_name =  $row["last_name"];
    $Email = $row["Email"];
    $Message = $row["Message"];

    echo "
    <table>

        <tr>
            <td>
                <form method =\"post\" action =\"delete.php\">
                    <input type =\"hidden\" name = \"sel_record\" value=\"$contact_id\">
                    <input type =\"submit\" name = \"delete\" value =\"Delete\">
                </form>

                <form method =\"post\" action =\"editform.php\">
                    <input type =\"hidden\" name = \"sel_record\" value=\"$contact_id\">
                    <input type =\"submit\" name = \"update\" value =\"Edit\">
                </form>
            </td>
            <td>
                 Firstname: $first_name  <br/>
                 Lastname: $last_name  <br/>
                Email : <a href=\"mailto:$Email\"> $Email</a> <br/>
                Message : $Message
            </td>
        </tr>
        <hr/>
    </table>
";
}
?>
