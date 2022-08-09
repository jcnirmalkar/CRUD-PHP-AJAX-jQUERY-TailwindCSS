
# CRUD-PHP-AJAX-jQUERY-TailwindCSS

simple crud operation app 
using: php | ajax | jquery | HTML | TailwindCSS


## Screenshots

<p align="center"><img  src="ajax.png" width="700"></p>

## Code
insert data | php
```bash
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
```

Display data | php
```bash
<?php
//making data base connection
include('dbConnection.php');


// display student information query
$sql = "SELECT * FROM student";
$result = $conn->query($sql);

if($result->num_rows > 0){
    $data= array();
    while($row = $result->fetch_assoc()){
        $data[] = $row;
    }
}
echo json_encode($data);
?>
```


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://katherinempeterson.com/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)
## License

[MIT](https://choosealicense.com/licenses/mit/)