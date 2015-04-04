<?php
    require_once(__DIR__ . "/../model/config.php");

    function authenticateUser() {
    	if(!isset($_SESSION["authentication"])) {
            return false;
    	}
    	else{
            if ($_SESSION["authentication"] != true) {
            	return false;
           }
           else { 
              return true;
            }
    	}
    }