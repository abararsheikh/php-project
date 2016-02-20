<?php
/**
 * @Author Yi Zhao
 *
 */

?>
<div class="container">
  <form action="register" method="post" class="form-horizontal">
    <div class="form-group">
      <label for="username" class="col-sm-2 control-label">Username</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" name="username" placeholder="Username">
      </div>
    </div>

    <div class="form-group">
      <label for="inputPassword" class="col-sm-2 control-label">Password</label>
      <div class="col-sm-10">
        <input type="password" class="form-control" name="password" placeholder="Password">
      </div>
    </div>

    <div class="form-group">
      <label for="inputPassword" class="col-sm-2 control-label">Repeat Password</label>
      <div class="col-sm-10">
        <input type="password" class="form-control" name="repeatPassword" placeholder="Repeat Password">
      </div>
    </div>

    <div class="form-group">
      <label for="inputEmail" class="col-sm-2 control-label">Email</label>
      <div class="col-sm-10">
        <input type="email" class="form-control" name="email" placeholder="Email">
      </div>
    </div>

    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" name="register" class="btn btn-success">Register</button>
        <button type="button" name="cancel" class="btn btn-warning">Cancel</button>
      </div>
    </div>
  </form>
</div>
