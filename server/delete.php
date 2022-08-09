<?php
include('dbConnection.php');
$data = stripcslashes(file_get_contents("php://input")); // getting raw data.
$mydata = json_decode($data,true); // raw data ko json data me conver krna.
$id = $mydata['sid'];

//deletenig
if(!empty($id)){
$sql="DELETE FROM student WHERE id = {$id}";
    if($conn->query($sql) == TRUE){
        echo 1;
    }
    else{
        echo 0;
    }
}
?>