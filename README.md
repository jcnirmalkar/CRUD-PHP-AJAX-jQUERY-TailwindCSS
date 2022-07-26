
# CRUD-PHP-AJAX-jQUERY-TailwindCSS

simple crud operation app 
using: php | ajax | jquery | HTML | TailwindCSS


## Screenshots

<p align="center"><img  src="ajax.png" width="700"></p>

## Code
insert and update data | php
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

show Editable data on input field | php 
```bash
<?php
include('dbConnection.php');
$data = stripcslashes(file_get_contents("php://input")); 
$mydata = json_decode($data,true); 
$id = $mydata['sid'];

//editing
$sql = "SELECT * FROM student WHERE id = {$id}";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
echo json_encode($row);
```
Delete data | php
```bash
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
```

Ajax - Insert , update , edit , delete, Display
```bash
$(document).ready(function () {

    //***********data display***************
    function showdata() {
        tdata = "";
        kk = "";
        $.ajax({
            url: "server/display.php",
            method: "GET",
            dataType: "json",
            success: function (res) {
                if (res) {

                    x = res;
                }
                else {
                    x = "";
                }
                for (i = 0; i < x.length; i++) {
                    // console.log(x[i]);

                    tdata += "<tr><td>"
                        + x[i].id +
                        "</td><td>"
                        + x[i].name +
                        "</td><td>"
                        + x[i].email +
                        "</td><td>"
                        + x[i].password +
                        "<td><button type='button' class='focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-2 py-0.5 mr-2 mb-2 dark:focus:ring-yellow-900 mt-2 btn-edit' data-sid=" + x[i].id + ">edit</button><button type='button' class='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-0.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 btn-del' data-sid=" + x[i].id + ">Delete</button></td></tr>";

                }
                $("#tbody").html(tdata);

            },
        });
    }
    showdata();


    //*****************data insert******************************
    $("#btnadd").click(function (e) {
        e.preventDefault();
        console.log("btn click");

        let stid = $("#stid").val();
        let nm = $("#nameid").val();
        let em = $("#emailid").val();
        let pw = $("#passwordid").val();
        //GET DATA OBJECT FORMATE
        mydata = { id: stid, name: nm, email: em, password: pw };
        console.log(mydata);

        //AJAX CALLING for data insert from client side to data base
        $.ajax({
            url: "server/insert.php",
            method: "POST",
            data: JSON.stringify(mydata),
            success: function (res) {
                // console.log(res);
                msg = "<span>" + res + "</span> ";
                $("#msg").html(msg);
                $("#myform")[0].reset();
                showdata();
            }
        });
    });


    //*************************data delete***************************************
    $("tbody").on("click", ".btn-del", function () {
        console.log("delete btn click");
        let id = $(this).attr("data-sid");
        // console.log(id);
        mydata = { sid: id };
        mthis = this;
        $.ajax({
            type: "POST",
            url: "server/delete.php",
            data: JSON.stringify(mydata),

            success: function (res) {
                // console.log(res);
                if (res == 1) {
                    msg = "<span class='text-red-400'>Delete successfully</span> ";
                    $(mthis).closest("tr").fadeOut();
                } else if (res == 0) {
                    msg = "<span>Unable to delete</span> ";
                }
                //server msg
                $("#msg").html(msg);
            }
        });
    });


    //*************************data edit*******************************************
    $("tbody").on("click", ".btn-edit", function () {
        console.log("edit btn click");
        let id = $(this).attr("data-sid");
        mydata = { sid: id };
        //data editing ajax calling
        $.ajax({
            type: "POST",
            url: "server/edit.php",
            data: JSON.stringify(mydata),
            dataType: "json",
            success: function (res) {
                // console.log(res);
                $("#stid").val(res.id);
                $("#nameid").val(res.name);
                $("#emailid").val(res.email);
                $("#passwordid").val(res.password);

            }
        });
    });
});


```


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/jcnirmalkar)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jcnirmalkar)
## License

[MIT](https://choosealicense.com/licenses/mit/)