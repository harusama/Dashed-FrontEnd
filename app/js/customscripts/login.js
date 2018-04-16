function singupUser(firstName, lastName, username, email, password, campusID) {

    // Request to API for signup.
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

function userLogin(email, password) {
    // Request to API
    $.ajax({
        type: "POST",
        url: urls.base + urls.usersScope + 'login',
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
                Cookies.set("userData", data);
                console.log(data.data);
                $.session.set('userData', data.data);
                $.session.set('username', data.data.username);
                $.session.set('name', data.data.firstName);
                $.session.set('lname', data.data.lastName);
                $.session.set('currency', data.data.coins);
                $.session.set('milestone', data.data.experience);
                $.session.set('StatusUser', 'Login');
                window.location.href = './dashboard.html';
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
                    title: "Sorry the information does not match our data!",
                    text: "Check your info",
                    showCloseButton: true
                });
            }
            else if (jqXHR.status == 400) {
                swal({
                    type: 'info',
                    position: 'top-end',
                    title: "It seems that you have not verified your account!",
                    text: "Go check your mail!",
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

// Close connection with server
function userLogout() {
    $.session.set('StatusUser', 'Logout');
}

function resetPassword(email) {

}

$(document).ready(function () {
    $.session.set('StatusUser', 'Logout');
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
        var firstName = data[0].value;
        var lastName = data[1].value;
        var email = data[2].value;
        var username = data[3].value;
        var password = data[4].value;
        var campusID = $('#campus-dropdown').attr('value');

        singupUser(firstName, lastName, username, email, password, campusID);
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