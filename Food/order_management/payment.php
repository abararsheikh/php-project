<?php
use Project\Payment\Payment;

$total=(string)((float)$order->Total_price*100);

            $_SESSION['grandPrice'] = $total;
            // Create a pay with stripe button on page.
            // Pass in the amount needs to be paid.
      ?><p>Total price is <?php echo $order->Total_price;?>. Do you want to pay?</p>
<?php echo Payment::stripeButton();?>
<button>Cancel</button>
