<?php

function GetConfig($term)
{
    if(isset($GLOBALS['APP_CFG'][$variable]) && $GLOBALS['APP_CFG'][$variable] != ''){
            return $GLOBALS['APP_CFG'][$variable];
    }
    return false;
}

function CheckLoginStatus()
{
    if(isset($_SESSION['user_logged_in']) && $_SESSION['user_logged_in'] == GetCookie('trackleu') ) { 
        return true;
    }
    return false;
}

function Parse($templateFile)
{
    return preg_replace("/\{{([^\{]{1,100}?)\}}/e","\$GLOBALS['$1']",file_get_contents(APP_TEMPLATE_PATH . $templateFile . '.html'));
}

function GetCookie($cookieName)
{
    if(!isset($_COOKIE[$cookieName])) {
        return '';
    }else{
        return $_COOKIE[$cookieName];
    }
}

function ThrowError($message)
{
    die('failure|' . $message);    
}