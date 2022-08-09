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
