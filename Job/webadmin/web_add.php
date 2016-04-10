<?php
require('conn.php');
session_start();
$act=$_GET['act']?$_GET['act']:'';
if($act=='add')
{

  $sql="insert into zhaoadd(qixian,renshu,yaoqiu,zhiwei)values('".$_POST['qixian']."','".$_POST['renshu']."','".$_POST['yaoqiu']."','".$_POST['zhiwei']."')";
  $result=$db->exec($sql);
  if($result)
  {
    echo  "<script language='javascript'>";
    echo  "alert('Sumbit success')";
    echo "</script>";
  }
}

?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Add Hire information</title>
<link href="Css_Main.css" rel="stylesheet" type="text/css">
<style type="text/css">
<!--
.style1 {color: #CCCCCC}
-->
</style>
</head>
<script language="JavaScript">
function  Check_stu()
{

	if (document.form1.zhiwei.value == "")
	 {   alert("Enter JOb title");
		document.form1.zhiwei.focus();
		return false;
	 }
	if (document.form1.qixian.value == "")
	 {   alert("Enter time");
		document.form1.qixian.focus();
		return false;
	 }
	 if (document.form1.renshu.value == "")
	 {   alert("Enter numbet you want");
		document.form1.renshu.focus();
		return false;
	 }
	
	 if (document.form1.yaoqiu.value == "")
	 {   alert("Enter your reqiorement");
		document.form1.yaoqiu.focus();
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
<form name="form1" action="web_add.php?act=add" method="post" enctype="multipart/form-data">
<table width="98%"  border="0" align="center" cellpadding="0" cellspacing="1" class="border">
  <tr class="title_top">
    <td colspan="2"><div align="center">Add Hire information</div></td>
  </tr>
  <tr class="tdbg">
    <td width="20%"><div align="right"><strong>Job title/strong></div></td>
    <td><input name="zhiwei" type="text"  size="40"></td>
  </tr>
  <tr class="tdbg">
    <td width="20%"><div align="right"><strong>Limit time/strong></div></td>
    <td><input name="qixian" type="text"  size="40"></td>
  </tr>
    <tr class="tdbg">





        
    <td width="20%"><div align="right"><strong>Hire number/strong></div></td>
    <td><input name="renshu" type="text"  size="40"></td>
  </tr>
  <tr class="tdbg">
    <td width="40%"><div align="right"><strong>Hire requirement/strong></div></td>
    <td><textarea name="yaoqiu" rows="5" cols="36"></textarea></td>
  </tr>
    
</table>
<table width="98%"  border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td height="40">
      <div align="center"><span class="style1">
        <input name="Submit" type="submit" id="Submit" value="Add" onClick="return Check_stu()">&nbsp;
        <input name="reset" type="reset" id="reset" value="cancel">
         <a href="addzhanshi.php" style="background-color: #0000fa">Go Back to Reult</a>

    </span>
      </div>
    </td>
  </tr>
</table></form>
</body>
</html>