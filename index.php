<html>

<?php
include_once $_SERVER['DOCUMENT_ROOT'] . '/autoloader.php';
?>
<head>
  <script src="/Assets/js/homepage.js"></script>
  <script src="/Assets/js/jquery.min.js"></script>
  <link href="Assets/css/homepage.css" type="text/css" rel="stylesheet">
  <link href="Assets/css/bootstrap.min.css" type="text/css" rel="stylesheet">

</head>

<body>
<main id="screen">
  <nav>
    <?php include $_SERVER['DOCUMENT_ROOT'] . '/Assets/html/header.php'; ?>
  </nav>
  <div id="moveText">
    <p>Watch:</p>
    <p><span id="target"></span><span id="cursor">|</span></p>
    <div class="text-center">
      <a href="/booking"><button class="btn btn-primary">Book Ticket</button></a>
    </div>
  </div>
  <div id="movePlaceholder"></div>
</main>

</body>


</html>

