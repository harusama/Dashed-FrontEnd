url = 'http://localhost:3000/v1/users/signup/verify?id=';

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
        return null;
    }
    else{
        return decodeURI(results[1]) || 0;
    }
}

function verifyEmail(urlHash) {

    // Request to API for signup.
    $.ajax({
        type: "GET",
        url: url,
        complete: function (xhr, settings) {
            if (xhr.status == 200) {
                swal({
                    type: 'success',
                    position: 'top-end',
                    title: "Congratulations!",
                    text: "Account verified!",
                    confirmButtonText: "Go to login!",
                    showCloseButton: true},
                    function (isConfirm) {
                        window.location.href = './login.html';
                    });
            }
            else if (xhr.status == 400) {
                swal({
                    type: 'error',
                    position: 'top-end',
                    title: "Sorry your email has not yet been verified!",
                    text: "Feel free to contact us if the problem persists!",
                    confirmButtonText: "Reload",
                    showCloseButton: true},
                    function (isConfirm) {
                        location.reload();
                    });
            }
            else if (xhr.status == 404) {
                swal({
                    type: 'info',
                    position: 'top-end',
                    title: "Email already verified.",
                    text: "Just login, email already verified!",
                    confirmButtonText: "Go to login!",
                    showCloseButton: true},
                    function (isConfirm) {
                        window.location.href = './login.html';
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

$(document).ready(function () {
    url += $.urlParam('id');//Get url with hash
    verifyEmail(url);//Verifies email.
});