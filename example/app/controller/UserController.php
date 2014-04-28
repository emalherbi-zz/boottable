<?php
  
require_once("User.php");
  
class UserController
{
    private $model; 
      
    public function __construct() {
        $this->model = new User();
    }
      
    public function all() {
        return $this->model->all();
    }
      
    public function edit( $params ) {
        return $this->model->edit( $params );
    }   
      
    public function save( $params ) {
    	parse_str( $params['form'], $params );
		return $this->model->save( $params );
    }
      
    public function delete( $params ) {
        return $this->model->delete( $params );
    }       
}
  
$controller = new UserController();
  
$method = $_POST['method'];
$params = $_POST;
  
echo json_encode( $controller->$method($params) );