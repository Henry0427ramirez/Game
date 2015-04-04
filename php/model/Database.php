<?php
class Database {
	private $connection;
	private $host;
	private $username;
	private $password;
	private $database;
	public $error;
	//these variables will stay with us
	//these varibles will be hidden when people access the file
	//we use private to only access it here in this file
  

	public function __construct ($host, $username, $password, $database) {
		//these variables will disappear when the function is done.
       $this->host = $host;
       $this->username = $username;
       $this->password = $password;
       $this->database = $database;

       $this->connection = new mysqli($host,$username,$password);
        /*$host(the server) $username(name of host) password(server password) */
        if ($this->connection->connect_error) {
	    die("<p>Error: " . $this->connection->connection_error . "</p>"); 
    } 

       $exists = $this->connection->select_db($database);

        /* this is used to see if the database exists*/
        if(!$exists) {
	    $query = $this->connection->query("CREATE DATABASE $database");
        /*this is used to create a database.*/

        if ($query) {
    	   echo "<p>Successfully created database;" . $database . "</p>";
    }

    }
        else {
           echo "<p>Database already exists.</p> ";
        /*to let us know that the database exists*/
    }

	}
  
    public function openConnection(){
     //we want to establish a connection
    	$this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);
    
        if($this->connection->connect_error) {
	    die("<p>Error: " . $this->connection->connection_error . "</p>");
        }
    }
    public function closeConnection(){
        if(isset($this->connection)){
            $this->connection->close();  
        }
    // to check if theres information in our call then closing it.
    }
    public function query($string){
        $this->openConnection();
    //we use the query to open the string then close it
        $query = $this->connection->query($string);
        
        if (!$query) {
        	$this->error = $this->connection->error;
        }

        $this->closeConnection();

        return $query;
    //to return the results of the query
    }
}

