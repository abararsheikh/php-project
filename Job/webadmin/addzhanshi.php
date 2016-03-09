
<?php
require('conn.php');
if($_GET["act"]=="del"){
  $sql="delete from zhaoadd where id=".$_GET["id"];
  if(mysql_query($sql) or die(mysql_error())){
    echo  "<script language='javascript'>";
    echo  "alert('Deleteed');";
    echo  "location.href='addzhanshi.php';";
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
  $sql="select * from  zhaoadd order by id desc";
}
$result=mysql_query($sql)  or die("cannotworkSQL：$sql");
$amount=mysql_num_rows($result);
}
if(isset($_GET["page"]))
{
$page=(int)$_GET["page"];
}
else
{

$page=1;

}
if($amount){

if ($amount<$PageSize){

$PageCount=1;
}
if($amount%$PageSize){

$PageCount= $amount/$PageSize+1;

$PageCount=intval($PageCount);
}
else
{
$PageCount=$amount/$PageSize;
}
}

else{

$PageCount=0;
}




//翻页连接

$Page_String="";
if ($page==1){
$Page_String.='First page|Previous|';
}
else{

$Page_String.='<a href=?page=1>First page</a>|<a href=?page='.($page-1).'>Previous</a>|';

}

if(($page==$PageCount)||($PageCount==0)){


$Page_String.='Next page|End page|';

}
else{

$Page_String.='<a href=?page='.($page+1).'>Next page</a>|<a href=?page='.$PageCount.'>End page</a>';

}mount-($page-1)*$PageSize;
$num=$a


?>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"">
<title>Marger System</title>
<link href="Css_Main.css" rel="stylesheet" type="text/css">

</head>

<body>
<table width="101%"  border="0" align="center" cellpadding="0" cellspacing="1" class="border">
  <tr>
    <td class="title_dh"><div align="center">
      <div align="center">Hire information</div>
    </div></td>
  </tr>
</table>

<table width="100%"  border="0" align="center" cellpadding="0" cellspacing="1" class="border">
  <tr class="title_top">

      <td width="20%"><div align="center">Hire Job</div></td>
    <td width="20%"><div align="center">Limit time</div></td>
	 <td width="20%"><div align="center">Hire number</div></td>
	 <td width="20%"><div align="center">Requirement</div></td>
	 <td width="20%"><div align="center">operate</div></td>
  </tr>

		  
<?php 


 $upLimit   =   ($page-1)*$PageSize;   
  $lowLimit   =  $PageSize; 
  $act=$_GET["action"];
if($act=="search")
{
   $type=$_POST["type"];
   $keywords=$_POST["keywords"];
  $sql="select * from  zhaoadd where ".$type." ='".$keywords."' order by id desc  limit ".$upLimit ."  ,".$lowLimit."";
}
else
{
   $sql="select * from  zhaoadd  order by id desc  limit ".$upLimit ."  ,".$lowLimit." ";
}
$result=mysql_query($sql)  or die("cannotworkSQL：$sql");


while($rs=mysql_fetch_object($result))
{
if($rs->adminID==$_SESSION["id"] || $_SESSION["admin"]!=='')
{
?> 
  <tr class="tdbg">
    <td><div align="center"><?php echo $rs->zhiwei;?></div></td>
     <td><div align="center"><?php echo $rs->qixian;?></div></td>
	 <td><div align="center"><?php echo $rs->renshu;?></div></td>
	  <td><div align="center"><?php echo $rs->yaoqiu;?></div></td>
	   <td><div align="center"><a href="?act=del&id=<?php echo $rs->id;?>">Delet</a></div></td>
 
	  

	
	</tr>
<?php
 
 }}

 az
 ?>
</table>
<table width="98%"  border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td height="40">
      <div align="center">		<label><?php echo $Page_String;?>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This<?php echo $page;?>Page&nbsp;&nbsp;All<?php echo $PageCount;?>page All<?php echo $amount;?>Message</label></div></td>
  </tr>
</table>



</body>
</html>