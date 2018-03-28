$(document).ready(function () {

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
    })
    //Toggle report options
    $("a.cancelReport").click(function (e) {
        e.preventDefault();
        $("#errorOptions").toggle();//On
        $("#errorSubmit").toggle();//Off
        $("#questionReport").hide();//Off
        $("#systemReport").hide();//Off

    })
    //==================================================
});