// Validate if user is logger
$(function () {
    console.log($.session.get('StatusUser') );
    if (!$.session.get('StatusUser') || $.session.get('StatusUser') == 'Logout'){
        window.location.href = '../index.html';
    }

});

function setUsersData() {
    $('#usersName').text($.session.get('name'));
    $('#username').text("@" + $.session.get('username'));
    $('#milestone').text($.session.get('milestone'));
    $('#currency').text($.session.get('currency'));
    var subjects = JSON.parse($.session.get('subjects'));
    console.log("setUserData Subjects: " + subjects);

    console.log(subjects.length);
    if (subjects !== null && subjects !== '' && subjects.length !== 0) {
        console.log("Succes Subjects: " + subjects);
        // Load content from subjects
        $(function () {
            $.each(subjects, function (key, body) {

                $('#subjectList').after(' ' +
                    '<li>' +
                    '   <a id="subject' + body.id + '" class="waves-effect waves-cyan white-text" target="_self" href="subject.html">' +
                    '       <i class="material-icons white-text">pages</i>' +
                    '       <span class="nav-text">' + body.name + '</span>' +
                    '   </a>' +
                    '</li>' +
                    '<div class="divider"></div>');

            });
        });
    } else {
        console.log("Error-No-Subjects: " + subjects);
    }
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