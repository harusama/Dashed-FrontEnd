// Validate if user is logger
$(function () {
    console.log($.session.get('StatusUser') );
    if (!$.session.get('StatusUser') || $.session.get('StatusUser') == 'Logout'){
        window.location.href = '../index.html';
    }

});

function setUsersData() {
    $('#usersName').text($.session.get('name') + " " + $.session.get('lname'));
    $('#milestone').text($.session.get('milestone'));
    $('#currency').text($.session.get('currency'));

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