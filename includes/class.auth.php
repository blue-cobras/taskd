<?php
    
    class Auth
    {
        public function DoLogin()
        {
            $email = strip_tags($_POST['email']);
            if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $password = $_POST['password'];
                if($this->ValidateLogin($email,$password)) {
                    $sessionId = uniqid();
                    //Set Session Variable and Cookie
                    $_SESSION['user_logged_in'] = $sessionId;
                    setcookie('taskdu',$sessionId,time()+24400,'/','/');
                }
            }else{
                ThrowError('That email was invalid. Please try again.');
            }
        }
        public function DoRegister()
        {
           /***
            $email = mysqli_real_escape_string($_POST['username']);
            $password = mysqli_real_escape_string(hash("sha512", $_POST['password']));
            $e_mail = '';
            if($_POST['email']) {
                $name = mysqli_real_escape_string(strip_tags($_POST['email']));
            }
            $check = mysqli_fetch_array(mysql_query("SELECT * 
                                                     FROM user
                                                     WHERE 'email' = '$e_mail'"));
            if($check != '0')  {
                ThrowError("That email already exists!");
            }
            mysqli_query("INSERT INTO user
                         (´email´, ´password´, ´salt´,) VALUES
                         ('$email', '$password', '$salt')");
            ***/
        }
        
        public function UserIsAdmin()
        {
            
        }
        
        public function DoLogout()
        {}
        
        public function ForgotPassword()
        {}
        
        public function UpdateUser()
        {}
        
        private function GetUserFromEmail($email)
        {}
        
        private function GetUserIdFromEmail($email)
        {}
        
        private function ValidateLogin($email,$password)
        {
            $pull = $GLOBALS['APPDB']->Query("SELECT salt FROM user WHERE email='$email'");
            $salt = $GLOBALS['APPDB']->FetchOne($pull);
            if(!$salt){
                ThrowError('Oops! That email address was not found. Please try again.');
            }
            $hashed = crypt($GLOBALS['APPDB']->Quote($password),$salt);
            $validateCall = $GLOBALS['APPDB']->Query("SELECT COUNT(*) FROM user WHERE email = '$email' AND password = '$hashed'");
            if ($GLOBALS['APPDB']->FetchOne($validateCall) > 0) {
                return true;
            }else{
                ThrowError('Oops! That email/password combination was not found. Please try again.');
            }
        }
    }
        
        
    
            
    /*****PREVIOUS CODE
    //LOGIN
   session_start();
    if($_POST['login']) {
        include_once("class.db.php");
        $email = strip_tags($_POST[email]);
        $password = strip_tags($_POST[password]);
        
         $email = stripslashes($email);
         $password = stripslashes(password);
         
        $email = mysqli_real_escape_string($email);
        $password = mysqli_real_escape_string($password);
        
        $password = md5($password);
        
        $sql = "SELECT *
                FROM user
                WHERE email='$email'
                LIMIT 1";
        $query = mysqli_query($db, $sql);
        $row = mysqli_fetch_array($query);
        
        $userid = $row['userid'];
        $db_password = $row['password'];
        
        if($password == $db_password) {
            $_SESSION['email'] = $email;
            $_SESSION['userid'] = $userid;
            
            header("Location: index.php");
        } else {
            echo "Wrong details!";
        }
    }

    //REGISTER
    if($_POST['register']) {
        if($_POST['email'] $$ $_POST['password']) {
            $email = mysqli_real_escape_string($_POST['username']);
            $password = mysqli_real_escape_string(hash("sha512", $_POST['password']));
            $e_mail = '';
            if($_POST['email']) {
                $name = mysqli_real_escape_string(strip_tags($_POST['email']));
            }
            $check = mysqli_fetch_array(mysql_query("SELECT * 
                                                     FROM user
                                                     WHERE 'email' = '$e_mail'"));
            if($check != '0')  {
                die("That email already exists!");
            }
            mysqli_query("INSERT INTO user
                         (´email´, ´password´, ´salt´,) VALUES
                         ('$email', '$password', '$salt')");
        }
    }
    **********/