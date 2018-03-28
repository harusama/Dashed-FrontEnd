$(document).ready(function () {

    //=================REPORT ERRORS====================
    //Change Report Error elements
    $('.changeErrorCard').click(function (e) {
        e.preventDefault();
        var toggleCard = $(this).attr('id');

        /*
        For question error; var == questionError;
        For system error; var == systemError;
         */

        if (toggleCard == "questionError"){
            alert("Question error");
        } else if (toggleCard == "systemError"){
            alert("System error");
        }else {
            alert("Error: 001");
        }
    })
    //==================================================
});