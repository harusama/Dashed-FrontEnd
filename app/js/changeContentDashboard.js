$(document).ready(function () {

    //Hide content from dashboard
    $('.toggleDashboardElements').click(function() {
        var id = '#' + $(this).attr('itemid');
        $(id).toggle(false);
    });
});