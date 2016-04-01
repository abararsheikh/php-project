<body style="background-color:#CEF6D8;">
<?php
//connect to database :
use Project\Classes\DB\DB;
include '../autoloader.php';
$db = DB::getDB();
//include 'dbconnect.php';

//once connected execute below query.

$sql = "SELECT * FROM contactus ORDER BY first_name ASC";
$statement1 = $db->prepare($sql);
$statement1->execute();
$selectResult= $statement1->fetchAll();
//$result = mysqli_query($db_connection,$sql) or die(mysqli_error($db_connection));

?>
<!Doctype HTML>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../Assets/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="../Assets/css/style.css"/>

    <title>List of contacts</title>
</head>

<?php include '../Assets/html/header.php'?>
<div class="container">
<body>
<h2>List of contacts</h2>

<table class="table table-bordered">
    <thead style="color:rosybrown;font-size: 24px;">
        <tr>
            <th scope="row">Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Message</th>
            <th>Delete</th>
            <th>Update</th>
        </tr>
    </thead>

    <?php foreach ($selectResult as $selectContact) : ?>
        <tbody>
            <tr>
                <td><?php echo $selectContact['first_name'] ?> </td>
                <td><?php echo $selectContact['last_name'] ?> </td>
                <td><?php echo $selectContact['Email'] ?> </td>
                <td><?php echo $selectContact['Message'] ?> </td>

                <td>
                    <form method ="post" action ="delete.php">
                        <input type ="hidden" name = "sel_record" value="<?php echo $selectContact['contact_id'] ?>">
                        <input type ="submit" name = "delete" value ="Delete">
                    </form>
                </td>
                <td>
                    <form method ="post" action ="editform.php">
                        <input type ="hidden" name = "sel_record" value="<?php echo $selectContact['contact_id'] ?>"/>
                        <input type ="submit" name = "update" value ="Edit">
                    </form>
                </td>

            </tr>
        </tbody>

    <?php endforeach; ?>
</table>

</body>
</div>

</html>
