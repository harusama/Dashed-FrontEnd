// Validate if user is logger
$(function () {
    console.log($.session.get('StatusUser') );
    if (!$.session.get('StatusUser') || $.session.get('StatusUser') == 'Logout'){
        window.location.href = '../index.html';
    }

});

function addSubject() {
    swal({
            title: "Ajax request example",
            text: "Submit to run ajax request",
            type: "info",   showCancelButton: true,
            closeOnConfirm: true,
            showLoaderOnConfirm: true, },
        function(){
            $.ajax({
                type: "POST",
                url: urls.base + urls.usersScope + "1/subjects/1",
                headers: {
                    // "Authorization": "" ,
                    "x-auth": $.session.get('token'),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },

                complete: function (xhr, textStatus) {
                    if (xhr.status == 201) {
                        console.log("Success");
                        //TODO: Mising user refresh endpoint with token.
                        location.reload();
                    }
                    else if (xhr.status == 404) {
                        console.log("error");
                    }
                    else if (xhr.status == 400) {
                        console.log("error");
                    } else {
                        console.log("error");
                    }
                }
            });
            setTimeout(function(){     swal("Ajax request finished!");   }, 2000);
        });
}

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

function insertQuestion(qData) {

    $('.questionAsset').remove();//Clears previous searches.

    var addQuestion = document.createElement('div');
    var qID = '';
    var type = '';
    addQuestion.setAttribute('class', 'col 12 questionAsset');

    switch (qData) {
        case '1':
            qID = 'bridgeMap';
            type = "../questions/bridgeMap.html";
            break;
        case '2':
            qID = 'mFlowMap';
            type = "../questions/mFlowMap.html";
            break;
        case '3':
            qID = 'fMap';
            type = "../questions/fMap.html";
            break;
        case '4':
            qID = 'dBubbleMap';
            type = "../questions/dBubbleMap.html";
            break;
        case '5':
            qID = 'bubblemap';
            type = "../questions/bubblemap.html";
            break;
        case '6':
            qID = 'cFrameMap';
            type = "../questions/cFrameMap.html";
            break;
        case '7':
            qID = 'treeMap';
            type = "../questions/treeMap.html";
            break;
        case '8':
            qID = 'braceMap';
            type = "../questions/braceMap.html";
            break;
    }

    addQuestion.id = qID;
    addQuestion.setAttribute('w3-include-html', type);

    //Runs script to run library.
    var load = document.createElement('script');
    load.innerHTML = 'w3IncludeHTML();';
    load.setAttribute('class', 'questionAsset');
    $('#searchQuestionID').after(addQuestion, load);
}

$(document).ready(function () {

    //Requests question information to API.
    $('#searchQuestionID').submit(function (e) {
        e.preventDefault();

        var data = $('#searchQuestionID').serializeArray();

        if (data[0].value != ''){
            //TODO: Do api request.
            alert("So request to API here, Question #" + data[0].value);
            insertQuestion(data[0].value);
        } else {
            //TODO: Show message of empty request.
            alert("Show message of invalid input");
        }
    });

    //Submits question error report to API.
    $('#qtnReport_form').submit(function (e) {
        e.preventDefault();

        var data = $('#searchQuestionID').serializeArray();
        var dataDescription = $('#qtnReport_form').serializeArray();

        if ($(this).attr('id') == "qtnReport_form") {
            //TODO: Submit report to api.
            alert("Question Report Submitted -> " + data[0].value + " -> " + dataDescription[0].value);

            swal({
                type: 'success',
                position: 'top-end',
                title: "Report submitted!",
                text: "Thank you for your help!",
                timer: 1500
            });

        } else {
            alert("Error: 002: " + $(this).attr('id'));
        }

        returnToReportOptions();
    });

    //Submits system error report to API.
    $('#sysReport_form').submit(function (e) {
        e.preventDefault();

        var dataDescription = $('#sysReport_form').serializeArray();

        if ($(this).attr('id') == "sysReport_form") {
            //TODO: Submit report to api.
            alert("System Report Submitted -> " + dataDescription[0].value);

            swal({
                type: 'success',
                position: 'top-end',
                title: "Report submitted!",
                text: "Thank you for your help!",
                timer: 1500
            });

        } else {
            alert("Error: 003: " + $(this).attr('id'));
        }

        returnToReportOptions();
    });

    //Toggle report options
    $(".cancelReport").click(function (e) {
        e.preventDefault();

        returnToReportOptions();
    });
    //==================================================
});