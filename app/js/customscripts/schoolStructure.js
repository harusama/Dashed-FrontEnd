var stateScope = 'states'
var stateStructure = null;
var regionStructure = null;
var districtStructure = null;
var campusStructure = null;

function cleanDropdown(elementID) {
    $(elementID).empty();
}

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
                stateStructure = $.jStorage.get('schoolStructure');//Get data in JSON. //TODO:Preguntar si hacer get en cada uno es mejor o variables globales.
                updateStateDropdown();
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
    cleanDropdown('#state-dropdown');
    cleanDropdown('#region-dropdown');
    cleanDropdown('#district-dropdown');
    cleanDropdown('#campus-dropdown');
    console.log(stateStructure);
    $.each(stateStructure, function (key, body) {
        $('#state-dropdown').append("<li class='state' value='" + key + "'><a>" + stateStructure[key].key + ", " + stateStructure[key].name + "</a></li>");
    });
}

function updateRegionDropdown(id) {
    cleanDropdown('#region-dropdown');
    cleanDropdown('#district-dropdown');
    cleanDropdown('#campus-dropdown');
    console.log(id);
    regionStructure = stateStructure[id].regions;
    console.log(regionStructure);
    $.each(regionStructure, function (key, body) {
        $('#region-dropdown').append("<li class='region' value='" + key + "'><a>" + regionStructure[key].key + ", " + regionStructure[key].name + "</a></li>");
    });
}

function updateDistrictDropdown(id) {
    cleanDropdown('#district-dropdown');
    cleanDropdown('#campus-dropdown');
    districtStructure = regionStructure[id].districts;
    console.log(districtStructure);
    $.each(districtStructure, function (key, body) {
        $('#district-dropdown').append("<li class='district' value='" + key + "'><a>" + districtStructure[key].number + ", " + districtStructure[key].name + "</a></li>");
    });
}

function updateCampusDropdown(id) {
    cleanDropdown('#campus-dropdown');
    campusStructure = districtStructure[id].campus;
    console.log(campusStructure);
    $.each(campusStructure, function (key, body) {
        $('#campus-dropdown').append("<li class='campus' value='" + key + "'><a>" + campusStructure[key].name + ", " + campusStructure[key].principal + "</a></li>");
    });
}

$(document).ready(function () {

    //Gets information for school structure. (State)
    $('#bt_register').click(function (e) {
        e.preventDefault();
        getCampusStructure();
    });

    //Gets information for school structure. (Region)
    $('#state-dropdown').on('click','li.state',function(e) {
        e.preventDefault();
        console.log($(this).attr('value'));
        updateRegionDropdown($(this).attr('value'));
    });

    //Gets information for school structure. (District)
    $('#region-dropdown').on('click','li.region',function(e) {
        e.preventDefault();
        console.log($(this).attr('value'));
        updateDistrictDropdown($(this).attr('value'));
    });

    //Gets information for school structure. (Campus)
    $('#district-dropdown').on('click','li.district',function(e) {
        e.preventDefault();
        console.log($(this).attr('value'));
        updateCampusDropdown($(this).attr('value'));
    });

    //Gets information for school structure. (Specific)
    $('#campus-dropdown').on('click','li.campus',function(e) {
        e.preventDefault();
        console.log("Campus: " + $(this).attr('value'));
        $('#campus-dropdown').attr('value', campusStructure[$(this).attr('value')].id);
        console.log("specific: " + $('#campus-dropdown').attr('value'));
    });
});

