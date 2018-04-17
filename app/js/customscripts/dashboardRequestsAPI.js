// Validate if user is logger
$(function () {
    console.log($.session.get('StatusUser') );
    if (!$.session.get('StatusUser') || $.session.get('StatusUser') == 'Logout'){
        window.location.href = '../index.html';
    }

});

function addSubjectUser(subjectID) {
    console.log("Subject id: " + subjectID);

    $.ajax({
        type: "POST",
        url: urls.base + urls.subjectScope + "/" + subjectID + "/users",
        headers: {
            // "Authorization": "" ,
            "x-auth": $.session.get('token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },

        complete: function (xhr, textStatus) {
            if (xhr.status == 201) {
                console.log("Success subject added");
                // Request to API for user refresh.
                $.ajax({
                    type: "GET",
                    url: urls.base + urls.usersScope +'me',
                    headers: {
                        // "Authorization": "" ,
                        "x-auth": $.session.get('token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    success: function (data, textStatus, xhr) {
                        if (xhr.status == 200 || xhr.status == 304) {
                            console.log("Refresh user OK: " + data.data);
                            setUserSessionData(data, xhr);
                        }
                        else if (xhr.status == 400) {
                            console.log("Status: " + xhr.status);
                        }
                        else if (xhr.status == 404) {
                            console.log("Status: " + xhr.status);
                        } else {
                            console.log("Status: " + xhr.status);
                        }
                    }
                });
                swal({
                        title: "Success",
                        text: "Subject added!",
                        type: "success",
                        showCancelButton: true,
                        closeOnConfirm: true,
                        showLoaderOnConfirm: true, },
                    function(){
                        location.reload();
                    });
            }
            else if (xhr.status == 404) {
                console.log("error: " + xhr.status);
                swal({
                        title: "Oops!",
                        text: "Something went wrong, please try again!",
                        type: "error",
                        showCancelButton: true,
                        closeOnConfirm: true,
                        showLoaderOnConfirm: true, },
                    function(){
                    });
            }
            else if (xhr.status == 400) {
                console.log("error: " + xhr.status);
                swal({
                        title: "Subject already exists.",
                        text: "Your subject is already on your list!",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: true,
                        showLoaderOnConfirm: true, },
                    function(){
                        //TODO:Refresh user here.
                    });
            } else {
                console.log("error: " + xhr.status);
                swal({
                        title: "Not found.",
                        text: "Please report error to administrator!",
                        type: "error",
                        showCancelButton: true,
                        closeOnConfirm: true,
                        showLoaderOnConfirm: true, },
                    function(){
                        //TODO:Refresh user here.
                    });
            }
        }
    });
}

function addSubject() {
    var subjectList = $.jStorage.get('subjectList');

    if (subjectList === null && subjectList === '' && subjectList.length === 0){
        // Request to API for subject list information.
        $.ajax({
            type: "GET",
            url: urls.base + urls.subjectScope,
            headers: {
                // "Authorization": "" ,
                "x-auth": $.session.get('token'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            success: function (data, textStatus, xhr) {
                if (xhr.status == 200 || xhr.status == 304) {
                    console.log("Status: " + xhr.status);
                    $.jStorage.set('subjectList', data.data);
                    console.log("New subjectList created:" + $.jStorage.get('subjectList'));
                    subjectList = $.jStorage.get('subjectList');//Get data in JSON. //TODO:Preguntar si hacer get en cada uno es mejor o variables globales.
                }
                else if (xhr.status == 400) {
                    console.log("Status: " + xhr.status);
                }
                else if (xhr.status == 404) {
                    console.log("Status: " + xhr.status);
                } else {
                    console.log("Status: " + xhr.status);
                }
            }
        });
    } else {
        console.log("Subject list already in storage " + subjectList);
    }

    console.log("Succes subjectList: " + subjectList);
    $.each(subjectList, function (key, body) {
        $('#subject-dropdown').append(
            '<li class="subject" value="' + key + '">' +
            '   <a id="subjectlist' + subjectList[key].id + '" sKey="' + key + '" onclick="addSubjectUser(' + subjectList[key].id + ')">'  + subjectList[key].name + '</a>' +
            '</li>'
        );
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