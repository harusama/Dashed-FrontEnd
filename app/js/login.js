function singupUser(email, password) {

}

url = 'http://localhost:3000/v1/users';

function userLogin(email, password) {
    // Request to API
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify({
            "email": email,
            "password": password
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        success: function (data, textStatus, xhr) {
            if (xhr.status == 201) {
                alert(data);
                Cookies.set("userData", data);
                window.location.href = 'http://localhost:8080/www/Dashed-FrontEnd/app/index.html';
            }
            else {
                swal({
                    type: 'error',
                    position: 'top-end',
                    title: "Internal error",
                    text: "Please reload page and try again",
                    showCancelButton: true,
                    confirmButtonText: "Reload",
                    timer: 1500
                }, function (isConfirm) {
                    if (isConfirm) {
                        location.reload();
                    }
                });
            }
        },
        error: function (jqXHR, ajaxOptions, thrownError) {
            if (jqXHR.status == 404) {
                swal({
                    type: 'error',
                    position: 'top-end',
                    title: "Sorry the username the credential don't match our data!",
                    text: "Check your info",
                    showCloseButton: true
                });
            }
            else if (jqXHR.status == 400) {
                swal({
                    type: 'info',
                    position: 'top-end',
                    title: "It seems that you have not verify your account!",
                    text: "Go check your mail",
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

// Close connection with firebase
function userLogout() {


}

function resetPassword(email) {

}


$(document).ready(function () {


    // Show register form
    $('#bt_register').click(function (e) {
        e.preventDefault();
        $('#login').toggle();
        $('#register').toggle('500');
        $('#user_login').trigger('reset');

    });

    // Show login form
    $('#bt_login').click(function (e) {
        e.preventDefault();
        $('#register').toggle();
        $('#login').toggle('500');
        $('#register_form').trigger('reset');

    });
    // Get values from form login
    $('#user_login').submit(function (e) {
        e.preventDefault();
        var data = $('#user_login').serializeArray();
        // userLogin(data[0].value, data[1].value)
        userLogin(data[0].value, data[1].value);
        // TODO: Delete this lines, just for test
        userLogout();
    });
    // Get values from form register
    $('#register_form').submit(function (e) {
        e.preventDefault();
        var data = $('#register_form').serializeArray();
        var email = data[2].value;
        var password = data[4].value;
        singupUser(email, password)
    });

    $('#forget_pass').click(function (e) {
        e.preventDefault();
        swal({
            title: 'Send Mail',
            text: 'Enter email to restore password ',
            type: 'input',
            input: 'email',
            inputPlaceholder: "Email",
            showCancelButton: true,
            closeOnConfirm: true,
            showLoaderOnConfirm: true
        }, function (inputValue) {
            setTimeout(function () {
                if (inputValue === false) return false;
                if (inputValue === "") {
                    swal.showInputError("You need to write something!");
                    return false;
                }
                resetPassword(inputValue);
            });
        });

    });


});