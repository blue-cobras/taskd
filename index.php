<?php
require_once('init.php');
if(CheckLoginStatus()) {
   Parse('default'); 
} else {
   Parse('login');
}
?>