<?php
require('conn.php');
session_start();
$act=$_GET['act']?$_GET['act']:'';
if($act=='add')
{
         
  $sql="insert into ceshi(wenti,answer1,answer2,answer3,answer4,rights,fenshu,name)values('".$_POST['wenti']."','".$_POST['answer1']."','".$_POST['answer2']."','".$_POST['answer3']."','".$_POST['answer4']."','".$_POST['rights']."','".$_POST['fenshu']."','".$_POST['name']."')";

  if(mysql_query($sql) or die(mysql_error()))
  {

    echo  "<script language='javascript'>";
    echo  "alert('提交成功');";
    echo  "location.href='Admin_Index_main.php'";
    echo "</script>";
  }
}

?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<title>招聘信息添加</title>
<link href="Css_Main.css" rel="stylesheet" type="text/css">
<style type="text/css">
<!--
.style2 {color: #FF0000}
.style1 {color: #CCCCCC}
-->
</style>
</head>
<script language="javascript" type="text/javascript" src="My97DatePicker/WdatePicker.js"></script>
<script language="JavaScript">
function  Check_stu()
{

	if (document.form1.zhiwei.value == "")
	 {   alert("请输入职位");
		document.form1.zhiwei.focus();
		return false;
	 }
	if (document.form1.qixian.value == "")
	 {   alert("请输入时间");
		document.form1.qixian.focus();
		return false;
	 }
	 if (document.form1.renshu.value == "")
	 {   alert("请输入招聘人数");
		document.form1.renshu.focus();
		return false;
	 }
	
	 if (document.form1.yaoqiu.value == "")
	 {   alert("请填写招聘要求");
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
    <td colspan="2"><div align="center">添加招聘信息信息</div></td>
  </tr>
  <tr class="tdbg">
    <td width="20%"><div align="right"><strong>问题题目：</strong></div></td>
    <td><input name="wenti" type="text"  size="40"></td>
  </tr>
  <tr class="tdbg">
    <td width="20%"><div align="right"><strong>问题A选项：</strong></div></td>
    <td><input name="answer1" type="text"  size="40"></td>
  </tr>
    <tr class="tdbg">
    <td width="20%"><div align="right"><strong>问题B选项：</strong></div></td>
    <td><input name="answer2" type="text"  size="40"></td>
  </tr>
  <tr class="tdbg">
    <td width="40%"><div align="right"><strong>问题C选项：</strong></div></td>
    <td><input name="answer3" type="text"  size="40"></td>
  </tr>
    <tr class="tdbg">
    <td width="40%"><div align="right"><strong>问题D选项：</strong></div></td>
    <td><input name="answer4" type="text"  size="40"></td>
  </tr>
      <tr class="tdbg">
    <td width="40%"><div align="right"><strong>设置问题答案例:(a、b、c、d)：</strong></div></td>
    <td><input name="rights" type="text"  size="40"></td>
  </tr>
       <tr class="tdbg">
    <td width="40%"><div align="right"><strong>题目分数</strong></div></td>
    <td><input name="fenshu" type="text"  size="40"></td>
  </tr>
        <tr class="tdbg">
    <td width="40%"><div align="right"><strong>名字</strong></div></td>
    <td><input name="name" type="text"  size="40"></td>
  </tr>
</table>
<table width="98%"  border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td height="40">
      <div align="center"><span class="style1">
        <input name="Submit" type="submit" id="Submit" value="添加" onClick="return Check_stu()">
&nbsp;
        <input name="reset" type="reset" id="reset" value="取消">
    </span> </div></td>
  </tr>
</table></form>
</body>
</html>