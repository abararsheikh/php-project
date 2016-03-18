<?php
require('conn.php');
$act=$_GET['act']?$_GET['act']:'';
if($act=='add')
{
  $pass=$_POST["pass"];
  $sql="insert into admin (name,password,qq,tel)values('".$_POST['name']."','".$pass."','".$_POST['qq']."','".$_POST['tel']."')";
   $result=$db->query($sql);
  if($result->execute())
  {
    echo  "<script language='javascript'>";
    echo  "alert('......');";
    echo  "location.href='admin_add.php';";
    echo "</script>";
  }
}

?>
<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<link href="Css_Main.css" rel="stylesheet" type="text/css">
<style type="text/css">

</style>
</head>
<script language="JavaScript">
function  Check_stu()
{
	if (document.form1.name.value == "")
	 {   alert("Please enter name");
		document.form1.name.focus();
		return false;
	 }
		if (document.form1.pass.value == "")
	 {   alert("Please enter password");
		document.form1.pass.focus();
		return false;
	 } 
	if (document.form1.tel.value == "")
	 {   alert("Please enter Phone");
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
<form name="form1" action="?act=add" method="post" >
<table width="98%"  border="0" align="center" cellpadding="0" cellspacing="1" class="border">
  <tr class="title_top">
    <td colspan="2"><div align="center">Add marger information</div></td>
  </tr>
  

  <tr class="tdbg">
    <td width="20%"><div align="right"><strong>ID*：</strong></div></td>
    <td><input name="name" type="text"  size="40"></td>
  </tr>
 <tr class="tdbg">
    <td width="20%"><div align="right"><strong>password*：</strong></div></td>
    <td><input name="pass" type="text"  size="40"></td>
  </tr>
   <tr class="tdbg">
    <td width="20%"><div align="right"><strong>Email：</strong></div></td>
    <td><input name="qq" type="text"  size="40"></td>
  </tr>
   <tr class="tdbg">
    <td width="20%"><div align="right"><strong>Phone*：</strong></div></td>
    <td><input name="tel" type="text"  size="25"></td>
  </tr>

  
</table>
<table width="98%"  border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td height="40">
      <div align="center"><span class="style1">
        <input name="Submit" type="submit" id="Submit" value="Add" onClick="return Check_stu()">
&nbsp;
        <input name="reset" type="reset" id="reset" value="cancel">
    </span> </div></td>
  </tr>
</table></form>
</body>
</html>

