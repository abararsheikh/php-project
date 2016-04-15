<?php
use Project\Auth\models\AuthModel;
use Project\Classes\Router\Nav;
use Project\Classes\View;

$navTemplate = [
    '<ul class="nav navbar-nav">',
    '<li class="%selected%"><a href="%link%">%name%</a></li>',
    '</ul>',
    'selected' => 'active',
];

if(AuthModel::getUser('roleId') !== false){
  echo AuthModel::getUser('roleId');
}else {
  echo 'not logged in';
  header("Location: /");
}
?>

<!Doctype HTML>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="/Assets/css/bootstrap.min.css"/>
  <link rel="stylesheet" href="/Assets/css/style.css"/>
  <title>Homepage</title>
</head>


<body>
<div class="pull-right">
  <div id="login"></div>
</div>

<div id="menuDisplay" data-menuName="Main"></div>

<!--   login   -->


