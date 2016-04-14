<?php

/**
* 
*/
class indexcontroller{
    
   public function index(){
$PageSize=10;
$act=isset($_GET["action"])?$_GET["action"]:'';
$sql="select count(*) from  hiring order by id desc";
if($act=="search")
{
   $type=$_POST["type"];
   $keywords=$_POST["keywords"];
   if($_SESSION['id']!=="" ){
  $sql="select count(*) from  hiring order by id desc";
}
$result=$db->query($sql)  or die("$sql");
$amount=$result->rowCount ;
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

$Page_String="";
if ($page==1){
$Page_String.='First|Previous |';
}
else{

$Page_String.='<a href=?page=1>First Page</a>|<a href=?page='.($page-1).'>Last page</a>|';
}
if(($page==$PageCount)||($PageCount==0)){

$Page_String.='Next page|End page|';
}
else{
$Page_String.='<a href=?page='.($page+1).'>Next page</a>|<a href=?page='.$PageCount.'>End page</a>';
}
$mount-($page-1)*$PageSize;
$num=$a



 $upLimit   =   ($page-1)*$PageSize;   
  $lowLimit   =  $PageSize; 
  $act=$_GET["action"];
if($act=="search")
{
   $type=$_POST["type"];
   $keywords=$_POST["keywords"];
  $sql="select * from  hiring where ".$type." ='".$keywords."' order by id desc  limit ".$upLimit ."  ,".$lowLimit."";
}
else
{
   $sql="select * from  hiring  order by id desc  limit ".$upLimit ."  ,".$lowLimit." ";
}
$result=$db->query($sql)  or die("$sql");


    }
}