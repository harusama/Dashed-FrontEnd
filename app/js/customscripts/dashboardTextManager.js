$(document).ready(function () {

    // Change Title Name
    $('a.changeTitle').click(function (e) {
        e.preventDefault();
        var name = $(this).text();

        $('a#dashboardSubTitle').text("(" + name + ")");

    });
});