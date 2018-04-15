// Validate if user is logger
$(function () {
    console.log($.session.get('StatusUser') );
    if (!$.session.get('StatusUser') || $.session.get('StatusUser') == 'Logout'){
        window.location.href = '../index.html';
    }

});

function addSubject() {
    // Request to API for add subject.
    $.ajax({
        type: "POST",
        url: urls.base + urls.usersScope + 'signup',
        data: JSON.stringify({
            "firstName": firstName,
            "lastName": lastName,
            "username": username,
            "email": email,
            "password": password,
            "campusId": parseInt(campusID)
        }),
        dataType: "json",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },

        complete: function (xhr, settings) {
            if (xhr.status == 201) {
                swal({
                        type: 'success',
                        position: 'top-end',
                        title: "Congratulations!",
                        text: "Please check your email to verify your account!",
                        timer:1500,
                        showConfirmButton: true,
                        closeOnConfirm: true
                    },
                    function(){
                        location.reload();
                    });
                $.session.set('StatusUser', 'Login');
            }
            else if (xhr.status == 404) {
                swal({
                    type: 'error',
                    position: 'top-end',
                    title: "Sorry the username the credential don't match our data!",
                    text: "Please make sure your information is correct! :)",
                    showCloseButton: true
                });
            }
            else if (xhr.status == 400) {
                swal({
                    type: 'info',
                    position: 'top-end',
                    title: "Error 400",
                    text: "Incomplete info",
                    showCloseButton: true
                });
            } else {
                swal({
                    type: 'error',
                    position: 'top-end',
                    title: "Internal error",
                    text: "Please reload page and try again",
                    showCancelButton: true,
                    confirmButtonText: "Reload"
                }, function (isConfirm) {
                    if (isConfirm) {
                        location.reload();
                    }
                });
            }
        }
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