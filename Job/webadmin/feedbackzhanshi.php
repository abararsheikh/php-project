<?php
require('conn.php');
if($_GET["act"]=="del"){
    $sql="delete from feedback where id=".$_GET["id"];
    $result=$db->query($sql);
    if($result->execute() or die(error())){
        echo  "<script language='javascript'>";
        echo  "alert('Deleteed');";
        echo  "location.href='feedbackzhanshi.php';";
        echo "</script>";
    }
}
session_start();




$PageSize=10;
$act=$_GET["action"];
if($act=="search")
{
    $type=$_POST["type"];
    $keywords=$_POST["keywords"];
    if($_SESSION['id']!=="" ){
        $sql="select * from  feedback order by id desc";
    }
    $result=$db->query($sql)  or die("$sql");
    $amount=$result->rowCount($result);
}
if(isset($_GET["page"]))
{
    $page=(int)$_GET["page"];
}
else
{

    $page=1;

}
?>

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"">
    <title>FeedBack</title>
    <link href="Css_Main.css" rel="stylesheet" type="text/css">

</head>

<body>
<table width="101%"  border="0" align="center" cellpadding="0" cellspacing="1" class="border">
    <tr>
        <td class="title_dh">
            <div align="center">
                <div align="center">FeedBack information</div>
            </div>
        </td>
    </tr>
</table>

<table width="100%"  border="0" align="center" cellpadding="0" cellspacing="1" class="border">
    <tr class="title_top">

        <td width="20%"><div align="center">username</div></td>
        <td width="20%"><div align="center">phone</div></td>
        <td width="20%"><div align="center">email</div></td>
        <td width="20%"><div align="center">address</div></td>
        <td width="20%"><div align="center">message</div></td>
    </tr>


    <?php


    $upLimit  = ($page-1)*$PageSize;
    $lowLimit =  $PageSize;
    if($act=="search")
    {
        $type=$_POST["type"];
        $keywords=$_POST["keywords"];
        $sql="select * from  feedback where ".$type." ='".$keywords."' order by id desc  limit ".$upLimit ."  ,".$lowLimit."";
    }
    else
    {
        $sql="select * from  feedback  order by id desc  limit ".$upLimit ."  ,".$lowLimit." ";
    }
    $result=$db->query($sql)  or die("$sql");


    while($rs=$result->fetchObject())
    {
        if($rs->adminID==$_SESSION["id"] || $_SESSION["admin"]!=='')
        {
            ?>

            <tr class="tdbg">
                <td><div align="center"><?php echo $rs->username;?></div></td>
                <td><div align="center"><?php echo $rs->phone;?></div></td>
                <td><div align="center"><?php echo $rs->email;?></div></td>
                <td><div align="center"><?php echo $rs->address;?></div></td>
                <td><div align="center"><?php echo $rs->message;?></div></td>
                <td><div align="center"><a href="?act=del&id=<?php echo $rs->id;?>">Deleted</a></div></td>
            </tr>


            <?php
        }
    }

    ?>
</table>
<table width="98%"  border="0" align="center" cellpadding="0" cellspacing="0">
    <tr>
        <td height="40">
            <div align="center">
                <label><?php echo $Page_String;?>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    First<?php echo $page;?>Page&nbsp;&nbsp;All
                    <?php echo $PageCount;?>page All<?php echo $amount;?>Message</label>

            </div>
        </td>
    </tr>
</table>

</body>
</html>