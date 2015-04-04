<?php
  require_once(__DIR__ . "/database.php");
  session_start();
  session_regenerate_id(true); 

  $path = "/AwesomeNautsproject/php/";
  // this our new path to fixe some of our files.
 
  $host = "localhost";
  $username = "root";
  $password = "root";
  $database = "awesomenauts_db";

  if (!isset($_SESSION["connection"])) {
  	//we want to connect the session when its not fiiled
  $connection = new Database($host, $username, $password, $database);
  //$host(the server) $username(name of host) password(server password and our database) 
  $_SESSION["connection"] = $connection;
  //we are going to connect our connection variable to our sessions variable
  }