<?php
require('conn.php');
$act=$_GET['act']?$_GET['act']:'';
if($act=='edit')
{

  $sql="update user set name='".$_POST['name']."',email='".$_POST['email']."',qq='".$_POST['qq']."',tel='".$_POST['tel']."' where id=".$_GET["id"];
  $result=$db->query($sql);
  if($result->execute())
  {
    echo  "<script language='javascript'>";
    echo  "alert('sumbit success');";
    echo  "location.href='user_admin.php';";
    echo "</script>";
  }
}
$sqls="select * from user where id=".$_GET['id'];
$results=$db->query($sqls);
$rss=$results->fetch();
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<link href="Css_Main.css" rel="stylesheet" type="text/css">
<style type="text/css">
<!--
.style2 {color: #FF0000}
.style1 {color: #CCCCCC}
-->
</style>

</head>
<script language="JavaScript">
function  Check_stu()
{
	if (document.form1.name.value == "")
	 {   alert("Enter your name");
		document.form1.name.focus();
		return false;
	 }
		if (document.form1.tel.value == "")
	 {   alert("Enter your Phone");
		document.form1.tel.focus();
		return false;
	 }
}
</script>
<body>
<table width="98%"  border="0" align="center" cellpadding="0" cellspacing="1" class="border">
  <tr>
    <td class="title_dh"><div align="center"></div></td>
  </tr>
</table>
<form name="form1" action="?act=edit&id=<?php echo $rss["id"];?>" method="post" >
<table width="98%"  border="0" align="center" cellpadding="0" cellspacing="1" class="border">
  <tr class="title_top">
    <td colspan="2"><div align="center">Modify information </div></td>
  </tr>


  <tr class="tdbg">
    <td width="20%"><div align="right"><strong>Name*：</strong></div></td>
    <td><input name="name" type="text"  size="40" value="<?php echo $rss["name"];?>"></td>
  </tr>
 <tr class="tdbg">
    <td width="20%"><div align="right"><strong>Email：</strong></div></td>
    <td><input name="email" type="text"  size="40" value="<?php echo $rss["email"];?>"></td>
  </tr>
   <tr class="tdbg">
    <td width="20%"><div align="right"><strong>codeqq：</strong></div></td>
    <td><input name="qq" type="text"  size="40" value="<?php echo $rss["qq"];?>"></td>
  </tr>
   <tr class="tdbg">
    <td width="20%"><div align="right"><strong>Phone*：</strong></div></td>
    <td><input name="tel" type="text"  size="25" value="<?php echo $rss["tel"];?>"></td>
  </tr>


</table>
<table width="98%"  border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td height="40">
      <div align="center"><span class="style1">
        <input name="Submit" type="submit" id="Submit" value="modify" onClick="return Check_stu()">
&nbsp;

    </span> </div></td>
  </tr>
</table></form>
</body>
</html>