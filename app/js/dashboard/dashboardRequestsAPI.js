$(document).ready(function () {

    //Requests question information to API.
    $('.searchQuestionID').click(function (e) {
        e.preventDefault();

        if ($('#questionID').val() != ''){
            //TODO: Do api request.
            alert("So request to API here, Question #" + $('#questionID').val());
        } else {
            //TODO: Show message of empty request.
            alert("Show message of invalid input");
        }
    })

    //Submits question report to API.
    $('.submitReport').click(function (e) {
        e.preventDefault();

        if ($(this).attr('id') == "submitQtnReport"){
            alert("Question Report Submitted");//TODO: Submit report to api.
        }else if ($(this).attr('id') == "submitSysReport"){
            alert("System Report Submitted");//TODO:Submit System report to api.
        }else {
            alert("Error: 002");
        }

        $("#errorOptions").toggle();//On
        $("#errorSubmit").toggle();//Off
        $("#questionReport").hide();//Off
        $("#systemReport").hide();//Off
    })
});