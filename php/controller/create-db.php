<?php

require_once(__DIR__ . "/../model/config.php");
/*directory of the file. If used inside an include, the 
directory of the included file is returned. */


$query = $_SESSION["connection"]->query("CREATE TABLE users (" 
	. "id int(11) NOT NULL AUTO_INCREMENT,"
	//nothing in the users info can be empty
	. "username varchar(30) NOT NULL,"
	// for the user
	. "email varchar(50) NOT NULL,"
	//to get there email
	. "password char(128) NOT NULL,"
	//there password
	. "exp init(4),"
    //
	. "exp init(4),"
    //
	. "exp init(4),"
    //
	. "exp init(4),"
    //
	. "exp init(4),"
	//
	. "PRIMARY KEY (id))");
    //
 


