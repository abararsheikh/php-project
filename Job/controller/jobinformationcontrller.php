<?php

/**
* 
*/
class information{
	
	public function index(){
	
$act=$_GET['act']?$_GET['act']:'';
$a=0;
if($act=='add')
{
  foreach($_POST as $key => $value){
  	if(strpos($key,"answer")>0){
		$questionArr[$a]["id"] = substr($key,strpos($key,"answer")+6);
		$questionArr[$a]["answer"] = $value;
		$a++;
	}
  }
      require_once('conn.php');
  $sql="select * from ceshi";
   $resC= $db->query($sql);
  $fenshu = 0;
  while($rs = $resC->fetchObject()){
  	foreach($questionArr as $key => $value){
 	 	if($value["id"] == $rs->id){
			if($value["answer"] == $rs->rights){
				$fenshu += $rs->fenshu;
			}
		}
 	}
  }
  
  $sql="insert into information(name,xingbie,hunfou,chusheng,xueli,biyetime,biyeschool,tel,xiandxi,fenshu)values('".$_POST['name']."','".$_POST['xingbie']."','".$_POST['hunfou']."','".$_POST['chusheng']."','".$_POST['xueli']."','".$_POST['biyetime']."','".$_POST['biyeschool']."','".$_POST['tel']."','".$_POST['information']."',".$fenshu.")";

   $result=$db->exec($sql);
  //  header('location:index1.php');

}

if(isset($_POST['Submit'])){
    if ($_POST['rand3']==$_POST['username32']){
        header('location:index.php');
    }
    else{
        $error=(" <span style='color :red;'> Wrong code </span>");
    }
}
	}
    public function info()
    {
        require_once('conn.php');
        $sqlMax = "select * from ceshi order by id desc";
        $resMax = $db->query($sqlMax) or die($sqlMax);
        $rsMax = $resMax->fetchObject();
        $max = $rsMax->id;

        $sqlMin = "select * from ceshi order by id";
        $resMin = $db->query($sqlMin) or die($sqlMin);
        $rsMin = $resMin->fetchObject();
        $min = $rsMin->id;

        $i = 1;
        while ($i <= 10) {
            $id = round(rand($min, $max));
            if (!in_array($id, $ids)) {
                $sql = "select * from ceshi where id=" . $id;
                $res = $db->query($sql);
                if ($rs = $res->fetchObject()) {
                    array_push($ids, $id);

                }
            }


        }
    }
}


?>