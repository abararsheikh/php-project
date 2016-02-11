<?php


class Sample extends Validator {
  public function sampleValidator(/* parameters */) {
    if (isValid) {
      return ''; // returns empty string
    }else{
      return 'error message'; // error message shown on page
    }
  }
}