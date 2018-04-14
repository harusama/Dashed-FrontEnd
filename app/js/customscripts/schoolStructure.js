stateScope = 'states/'
function getCampusStructure() {
    // Request to API for school structure information.
    $.ajax({
        type: "GET",
        url: url,
        complete: function (xhr, settings) {
            alert("Success CompusStructure information brought");
            if (xhr.status == 200) {

            }
            else if (xhr.status == 400) {

            }
            else if (xhr.status == 404) {

            } else {

            }
        }
    });
}

$(document).ready(function () {

    //Gets information for school structure.
    $('#bt_register').click(function (e) {
        e.preventDefault();
        getCampusStructure();
    });

});

