<?php
require('conn.php');
session_start();
$act=$_GET['act']?$_GET['act']:'';
if($act=='add')
{
         
  $sql="insert into ceshi(wenti,answer1,answer2,answer3,answer4,rights,fenshu,name)values('".$_POST['wenti']."','".$_POST['answer1']."','".$_POST['answer2']."','".$_POST['answer3']."','".$_POST['answer4']."','".$_POST['rights']."','".$_POST['fenshu']."','".$_POST['name']."')";
   $result=$db->query($sql);
  if($result->execute() )
  {

    echo  "<script language='javascript'>";
    echo  "alert('sumbit ok');";
    echo  "location.href='Admin_Index_main.php'";
    echo "</script>";
  }
}

?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Hire information</title>
<link href="Css_Main.css" rel="stylesheet" type="text/css">
<style type="text/css">

</style>
</head>

<script language="JavaScript">
function  Check_stu()
{

	if (document.form1.zhiwei.value == "")
	 {   alert("Enter job");
		document.form1.zhiwei.focus();
		return false;
	 }
	if (document.form1.qixian.value == "")
	 {   alert("Enter time");
		document.form1.qixian.focus();
		return false;
	 }
	 if (document.form1.renshu.value == "")
	 {   alert("Enter nunmber");
		document.form1.renshu.focus();
		return false;
	 }
	
	 if (document.form1.yaoqiu.value == "")
	 {   alert("Enter Hire Requirement");
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
<form name="form1" action="test_add.php?act=add" method="post" enctype="multipart/form-data">
<table width="98%"  border="0" align="center" cellpadding="0" cellspacing="1" class="border">
  <tr class="title_top">
    <td colspan="2"><div align="center">Add Hire Requirement</div></td>
  </tr>
  <tr class="tdbg">
    <td width="20%"><div align="right"><strong>Question Title：</strong></div></td>
    <td><input name="wenti" type="text"  size="40"></td>
  </tr>
  <tr class="tdbg">
    <td width="20%"><div align="right"><strong>A：</strong></div></td>
    <td><input name="answer1" type="text"  size="40"></td>
  </tr>
    <tr class="tdbg">
    <td width="20%"><div align="right"><strong>B：</strong></div></td>
    <td><input name="answer2" type="text"  size="40"></td>
  </tr>
  <tr class="tdbg">
    <td width="40%"><div align="right"><strong>C：</strong></div></td>
    <td><input name="answer3" type="text"  size="40"></td>
  </tr>
    <tr class="tdbg">
    <td width="40%"><div align="right"><strong>D：</strong></div></td>
    <td><input name="answer4" type="text"  size="40"></td>
  </tr>
      <tr class="tdbg">
    <td width="40%"><div align="right"><strong>answer:(a、b、c、d)：</strong></div></td>
    <td><input name="rights" type="text"  size="40"></td>
  </tr>
       <tr class="tdbg">
    <td width="40%"><div align="right"><strong>Mark</strong></div></td>
    <td><input name="fenshu" type="text"  size="40"></td>
  </tr>
        <tr class="tdbg">
    <td width="40%"><div align="right"><strong>Name</strong></div></td>
    <td><input name="name" type="text"  size="40"></td>
  </tr>
</table>
<table width="98%"  border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td height="40">
      <div align="center"><span class="style1">
        <input name="Submit" type="submit" id="Submit" value="ADD" onClick="return Check_stu()">
&nbsp;
        <input name="reset" type="reset" id="reset" value="Cancel">
    </span> </div></td>
  </tr>
</table></form>
</body>
</html>