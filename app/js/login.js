// Open connection whit firebase
function funcionFirebaseInit() {

    var config = {
        apiKey: "AIzaSyAHeHoeGRWM6Rl2oSMtO2ALnMM-b_IZF-I",
        authDomain: "dashed-a8706.firebaseapp.com",
        databaseURL: "https://dashed-a8706.firebaseio.com",
        projectId: "dashed-a8706",
        storageBucket: "dashed-a8706.appspot.com",
        messagingSenderId: "757776098216"
    };
    firebase.initializeApp(config);
}

function authUser() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            user.sendEmailVerification().then(function () {
                swal({
                    title: "Check your email!",
                    text: "We have send you a confirmation email.",
                    timer: 3000,
                    showConfirmButton: true
                }, function () {
                    location.reload();
                });
            }).catch(function (error) {
                swal({
                    type: "warning",
                    title: "Sorry :(",
                    text: "A problem whit the server ocurre try again please.",
                    timer: 3000,
                    showConfirmButton: true
                });
            });
        }
    });

}

function singupUser(email, password) {

// FUNCION DE FIREBASE QUE CREA LA CUENTA EN LA PLATAFORMA DE FIREBASE
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {

        switch (error.code) {
            case 'auth/email-already-in-use':
                swal({
                    type: "warning",
                    title: "Sorry :(",
                    text: error.message,
                    timer: 3000,
                    showConfirmButton: true
                });
                break;
            case 'auth/invalid-email' :
                swal({
                    type: "warning",
                    title: "Sorry :(",
                    text: error.message,
                    timer: 3000,
                    showConfirmButton: true
                });
                break;
            case 'auth/operation-not-allowed':
                swal({
                    type: "warning",
                    title: "Sorry :(",
                    text: error.message,
                    timer: 3000,
                    showConfirmButton: true
                });
                break;
            case 'auth/weak-password':
                swal({
                    type: "warning",
                    title: "Sorry :(",
                    text: error.message,
                    timer: 3000,
                    showConfirmButton: true
                });
                break;
            default:
                //auth/network-request-failed
                swal({
                    type: "error",
                    title: "Sorry :(",
                    text: "Error in the server try again please.",
                    timer: 2000
                });

        }
    });
    authUser();
}


function userLogin(email, password) {

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        console.log(error.code);

        var errorMessage = error.message;
        var errorCode = error.code;
        switch (errorCode) {
            case 'auth/invalid-email':
                console.log("The email address is invalid");
                swal({
                    type: "error",
                    title: "The email address is invalid",
                    timer: 3000,
                    showConfirmButton: true
                });

                break;
            case 'auth/wrong-password':
                swal({
                    type: "error",
                    title: "The username or password are wrong",
                    timer: 3000,
                    showConfirmButton: true
                });
                break;
            case 'auth/user-not-found':
                swal({
                    type: "error",
                    title: "The username doesn't exist",
                    timer: 3000,
                    showConfirmButton: true
                });
                break;
            default:
        }

    });

    firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log(user);
                console.log(user.emailVerified);
                if (!user.emailVerified) {
                    swal({
                        type: "warning",
                        title: "You haven't confirm your email jet.",
                        showCancelButton: true,
                        confirmButtonText: 'Yes, please!',
                        cancelButtonText: "No, I'll wait",
                        buttonsStyling: false,
                        reverseButtons: true
                    }, function (isConfirm) {
                        if (isConfirm) {
                            authUser();
                        }
                        else {
                            swal({
                                title: 'Ok, I will wait to',
                                timer: 3000
                            });
                        }
                    });

                } else {
                    console.log(user);
                    swal({
                        type: "success",
                        title: "Welcome back",
                        timer: 2000,
                        showConfirmButton: false
                    }, function () {
                        window.location = 'index.html'
                    });

                }
            } else {
                // console.log("Error in conection");
                // swal({
                //     type: "warning",
                //     title: "Error in connection.",
                //     timer: 3000,
                //     showConfirmButton: true
                // });

            }

        }
    );

}

// Close connection with firebase
function userLogout() {

    firebase.auth().signOut();
    // funcionDestruirSesion();

}

function resetPassword(email) {
    var auth = firebase.auth();

    auth.sendPasswordResetEmail(email).then(function () {
        swal({
            title: "Check your email!",
            text: "We have send you a confirmation email.",
            timer: 3000,
            showConfirmButton: true
        }, function () {
            location.reload();
        });
    }).catch(function (error) {
        swal({
            type: 'warning',
            title: "Opss..",
            text: "Something went wrong.",
            timer: 4000,
            showConfirmButton: true
        }, function () {
            location.reload();
        });
    });

}


$(document).ready(function () {
    // init connection whit firebase
    funcionFirebaseInit();


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