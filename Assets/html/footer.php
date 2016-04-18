<footer class="footer">
  <div class="well container">
    <div class="col-sm-4 text-center">
      <?php
      use Project\Classes\Router\Nav;

      $footerNav = ['', '<p class="text-muted"><a href="%link%">%name%</a></p>', ''];
      Nav::drawMenu('Homepage', $footerNav)
      ?>
    </div>
    <div class="col-sm-offset-4 text-center">
      <p><a href="#">contact us</a></p>
      <p><a href="#">customer service</a></p>
      <p><a href="#">about us</a></p>
      <p><a href="#">contact us</a></p>
    </div>
  </div>
</footer>

<script src="/Assets/js/jquery.min.js"></script>
<script src="/Assets/js/bootstrap.min.js"></script>
<script src="/Assets/js/authApp.js"></script>
<script src="/Assets/js/MenuDisplay.js"></script>
