<?php
require_once('init.php');
if (CheckLoginStatus()) && Auth::UserIsAdmin()) {
   Parse('admin'); 
} else {
    Parse('login');
}