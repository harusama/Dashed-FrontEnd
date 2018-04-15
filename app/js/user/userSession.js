// Close connection with server
function userLogoutDash() {
    $.session.set('StatusUser', 'Logout');
    console.log("User is logged out");
    window.location.href = 'login.html';
}

$(document).ready(function () {
    $('.logoutBtn').click(function () {
        userLogoutDash();
    });
});