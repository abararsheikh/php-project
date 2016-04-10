<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
	<title>FAQ</title>

	<!-- Bootstrap -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
	<link rel="stylesheet" href="../../Assets/css/FAQ.css">

	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body>
	<div id="main" class="container">

		<h2>FAQ & Terms</h2>
		<div class="row">
			<div class="col-lg-8 col-sm-12 col-md-8">
				<div class="row menu">
					<ul class="nav nav-tabs menu-nav col-md-12 col-sm-12 col-xs-12 nav-style">
						<li role="presentation" class="active" id="FAQ">
							<a href="#content" id="showFAQ">FAQ</a>
						</li>
						<li role="presentation" class="" id="Terms">
							<a href="#Terms" id="showTerms">Terms & Conditions</a>
						</li>
					</ul>

				</div>
				<div id="content">
					<div class="row">
						<div class="col-xs-4 col-sm-4">
							<form class="navbar-form" id="search-form">
								<div class="input-group">
									<input type="text" class="form-control" placeholder="Search" id="searchBox">
									<div class="input-group-btn">
										<button class="btn btn-default" type="button"><i class="glyphicon glyphicon-search"></i></button>
									</div>
								</div>
							</form>
						</div>
						
						<div class="col-sm-4 col-xs-12">
							
								<select name="select-option" class="form-select" id="question-list">
									<option value="allQuestion">ALL Question</option>
									<?php foreach($categorys as $category): ?>
									<option value="<?php echo $category->category?>"><?php echo $category->category?></option>
									<?php endforeach?>
								</select>
							
						</div>
						
						
						<div class="col-sm-4 col-xs-12">
							
								<select name="select-option" class="form-select" id="sort-by">
									<option value="id">Sort By</option>
									<option value="id">Question Number</option>
									<option value="frequency">Frequent Ask</option>
								</select>
							
						</div>
						

					</div>

					<div class="question-list">

						<?php foreach($results as $result):?>

						<div class="row question" name="<?php echo $result->question_id?>">
							<div class="col-lg-12 no-padding"><span><?php echo $result->question_id?>.</span><?php echo $result->questions?></div>
						</div>

						<div class="row answer">
							<?php foreach($result->answer as $row):?>
							<p class="col-lg-12">
								<?php echo $row?>
							</p>
							<?php endforeach?>
						</div>

						<?php endforeach?>

					</div>
				</div>
				<div id="Terms">
					This is Terms
				</div>
			</div>


			<div class="col-lg-4 col-sm-12 col-md-4">
				<h4 class="terms-head">Talk to us</h4>
				<div class="contact-us">
					<span class="circle"><a href=""><i class="glyphicon glyphicon-envelope envelope-size"></i>
						</a></span>

					<div class="contact-info">
						<h4 class="media-heading">Email</h4>
						<a href="mailto:concierge@pvrdirectorscut.com">concierge@pvrdirectorscut.com</a>
					</div>

				</div>
				
				<div class="booking-form">
          <h2>Message</h2>

          <form action="#" method="post" id="contactForm">
           
			  <div class="contactform">
                                <p class="form-group">
                                    <label for="contactName"><b>Name:</b></label>
                                    <input type="text" class="form-text" name="contactName" id="contactName" value="" class="required requiredField full">

                                </p>

                                <p class="form-group">
                                    <label for="email"><b>Email:</b></label>
                                    <input type="text" class="form-text" name="email" id="email" value="" class="required requiredField email full">
                                </p>

                                <p class="form-group">
                                    <label for="commentsText"><b>Message:</b></label>
                                    <textarea name="comments" class="form-text" id="commentsText" rows="10"></textarea>
                                </p>
                               
                                
                            </div>
            

            <button type="button" class="btn btn-default booking-btn">Send
              <img alt="arrow pic" class="btn-arrow" src="../../Assets/image/btn-arrow.png">
            </button>
          </form>

        </div>
			</div>
			

		</div>
	</div>
	


	<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<!-- Include all compiled plugins (below), or include individual files as needed -->
	<!-- Latest compiled and minified JavaScript -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
	<script src="../../Assets/js/FAQ.js"></script>
</body>

</html>