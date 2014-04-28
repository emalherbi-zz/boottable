<?php
  
require_once("DataBase.php");
  
class User
{
    var $database;
      
    public function __construct() {
        $this->database = new DataBase();
    }
      
    public function all() {
        $sql = " SELECT * FROM USER ORDER BY 1 ";
        return $this->database->select_sql( $sql );
    }   
      
    public function edit( $params ) {
    	$c = utf8_decode($params['code']);
    	
        $sql = " SELECT * FROM USER WHERE ID_USER = " . $c;
        return $this->database->select_sql( $sql );    	
    }       
      
    public function save( $params ) {
    	$id_user  = utf8_decode( $params['txt-user-code'] 	  );
		$name 	  = utf8_decode( $params['txt-user-name'] 	  );
    	$password = utf8_decode( $params['txt-user-password'] );
    	    	    	
    	$params = array(
    		'ID_USER' 	=> $id_user,
    		'NAME' 		=> "'$name'",
    		'PASSWORD' 	=> "'$password'",
    		'ACTIVE' 	=> '1',
    	);
    	
    	return $this->database->execute_sp('SX_USER', $params, $id_name, $id);
    }
      
    public function delete( $params ) {
		$c = utf8_decode($params['code']);
		
		return $this->database->execute_sql("UPDATE USER SET ACTIVE = 0 WHERE ID_USER = $c ");
	}   
}