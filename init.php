<?php
session_start();
define('APP_BASE_PATH', dirname(__FILE__));
define("APP_CONFIG_PATH", APP_BASE_PATH . "/config/config.php");
foreach (glob(dirname(__FILE__) . "/includes/*.php") as $filename)
{
    require_once($filename);
}
if(file_exists(APP_CONFIG_PATH)){
	require(APP_CONFIG_PATH);
}else{
    //run installation script;
}

error_reporting(E_ALL & ~E_NOTICE & ~E_STRICT & ~E_DEPRECATED & ~E_WARNING);
ini_set("track_errors","1");
@set_time_limit(0);
ini_set("magic_quotes_runtime", "off");

// If the PHP timezone function exists, set the default to GMT so calls to date()
// will return the GMT time. Our date functions can then apply our timezone on top
// of this
if(function_exists('date_default_timezone_set')) {
	date_default_timezone_set('GMT');
}
@ob_start();

define('APP_TEMPLATE_PATH', 'templates/');
$GLOBALS['TemplatePath'] = APP_TEMPLATE_PATH;

if(!isset($GLOBALS['APPDB'])) {
    $GLOBALS['APPDB'] = new Database();
    $GLOBALS['APPDB']->Connect();
}
