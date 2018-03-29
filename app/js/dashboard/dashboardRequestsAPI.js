function returnToReportOptions() {

    //Reset forms
    $('#searchQuestionID').trigger('reset');
    $('#qtnReport_form').trigger('reset');
    $('#sysReport_form').trigger('reset');

    //Reset options
    $("#errorOptions").toggle();//On
    $("#errorSubmit").toggle();//Off
    $("#questionReport").hide();//Off
    $("#systemReport").hide();//Off
}

$(document).ready(function () {

    //Requests question information to API.
    $('#searchQuestionID').submit(function (e) {
        e.preventDefault();

        var data = $('#searchQuestionID').serializeArray();

        if (data[0].value != ''){
            //TODO: Do api request.
            alert("So request to API here, Question #" + data[0].value);
        } else {
            //TODO: Show message of empty request.
            alert("Show message of invalid input");
        }
    })

    //Submits question error report to API.
    $('#qtnReport_form').submit(function (e) {
        e.preventDefault();

        var data = $('#searchQuestionID').serializeArray();
        var dataDescription = $('#qtnReport_form').serializeArray();

        if ($(this).attr('id') == "qtnReport_form") {
            //TODO: Submit report to api.
            alert("Question Report Submitted -> " + data[0].value + " -> " + dataDescription[0].value);
        } else {
            alert("Error: 002: " + $(this).attr('id'));
        }

        returnToReportOptions();
    })

    //Submits system error report to API.
    $('#sysReport_form').submit(function (e) {
        e.preventDefault();

        var dataDescription = $('#sysReport_form').serializeArray();

        if ($(this).attr('id') == "sysReport_form") {
            //TODO: Submit report to api.
            alert("System Report Submitted -> " + dataDescription[0].value);
        } else {
            alert("Error: 003: " + $(this).attr('id'));
        }

        returnToReportOptions();
    })

    //Toggle report options
    $(".cancelReport").click(function (e) {
        e.preventDefault();

        returnToReportOptions();
    })
    //==================================================
});