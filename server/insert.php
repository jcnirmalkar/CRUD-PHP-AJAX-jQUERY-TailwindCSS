<?php
include('dbConnection.php');

//reading ajax data
$data = stripcslashes(file_get_contents("php://input")); 
$mydata = json_decode($data,true); 

// data ke assosiatieve data ko variable define karke usme store krna.
$id = $mydata['id']; 
$name = $mydata['name']; 
$email = $mydata['email']; 
$password = $mydata['password']; 

//insert and update
if(!empty($name) && !empty($email) && !empty($password)){
     $sql = "INSERT INTO student (id, name, email, password)  VALUES
      ('$id', '$name', '$email', '$password') ON DUPLICATE KEY
      UPDATE name='$name', email='$email', password='$password'";
     
    if($conn->query($sql) == TRUE)
     {
        echo "student data save succesfully";
     }
   }
     else 
     {
        echo "fill all fields";
     }

?>