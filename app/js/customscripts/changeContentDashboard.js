function setUsersData() {
    var cookie = JSON.parse(Cookies.get('userData'));//Get data in JSON
    $('#usersName').text(cookie.data.firstName + " " + cookie.data.lastName);
};

$(document).ready(function () {

    //============== Get User Data ===================
        setUsersData();
    //================ End User Data =================

    //=================REPORT ERRORS====================
    //Change Report Error elements
    //Toggle input report
    $('.changeErrorCard').click(function (e) {
        e.preventDefault();
        var toggleCard = $(this).attr('id');

        $("#errorOptions").toggle();//Off
        $("#errorSubmit").toggle();//On
        /*
        For question error; var == questionError;
        For system error; var == systemError;
         */

        if (toggleCard == "questionError"){
            $("#questionReport").toggle();//On
        } else if (toggleCard == "systemError"){
            $("#systemReport").toggle();//On
        }else {
            alert("Error: 001");
        }
    });
});