var stateScope = 'states'
function getCampusStructure() {
    // Request to API for school structure information.
    $.ajax({
        type: "GET",
        url: url + stateScope,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        success: function (data, textStatus, xhr) {
            if (xhr.status == 200 || xhr.status == 304) {
                console.log("Status: " + xhr.status);
                $.jStorage.set('schoolStructure', data.data);
                console.log($.jStorage.get('schoolStructure'));
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
}

function updateStateDropdown() {
    var data = JSON.parse(Cookies.get('schoolStructure'));//Get data in JSON.
    console.log(data);
    // $.each(data, function (key, body) {
    //     $('#state-dropdown').append("<li><a>" + data[key].key + ", " + data[key].name + "</a></li>");
    // });
}

$(document).ready(function () {

    //Gets information for school structure.
    $('#bt_register').click(function (e) {
        e.preventDefault();
        getCampusStructure();
    });
});

