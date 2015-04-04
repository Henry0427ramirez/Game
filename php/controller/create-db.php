<?php

require_once(__DIR__ . "/../model/config.php");
/*directory of the file. If used inside an include, the 
directory of the included file is returned. */

$query = $_SESSION["connection"]->query("CREATE TABLE posts ("
	//creates id's for posts.
	. "id int(11) NOT NULL AUTO_INCREMENT, "
	// title is a string of 255 characters.
	. "title varchar(255) NOT NULL,"
	// creates posts column.
	. "post text NOT NULL,"
	//for the date and time
	. "DateTime datetime NOT NULL,"
	// telling thr post text that the primary key is id.
	. "PRIMARY KEY (id))");

if ($query) {
	echo "Successfully created table: posts";
	//to let u know we created a table.
}
else{
	echo "<p>" . $_SESSION["connection"]->error . "</p>";
	/* the p tags are to put the statemnets in paragraphs
	in there own lines*/
}

$query = $_SESSION["connection"]->query("CREATE TABLE users (" 
	. "id int(11) NOT NULL AUTO_INCREMENT,"
	//nothing in the users info can be empty
	. "username varchar(30) NOT NULL,"
	// for the user
	. "email varchar(50) NOT NULL,"
	//to get there email
	. "password char(128) NOT NULL,"
	//there password
	. "salt char(128) NOT NULL,"
	//
	. "PRIMARY KEY (id))");
    //

if ($query) {
	echo "<p>Successfully created new table: users</p>";
}
else{
	echo "<p>" . $_SESSION["connection"]->error . "</p>";
}

