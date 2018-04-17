// Validate if user is logger
$(function () {
    console.log($.session.get('StatusUser') );
    if (!$.session.get('StatusUser') || $.session.get('StatusUser') == 'Logout'){
        window.location.href = '../index.html';
    }
});

function searchTopics() {
    var input, filter, ul, li, content, i;
    input = document.getElementById("searchTopic");
    filter = input.value.toUpperCase();
    ul = document.getElementById("topic-collection");
    li = ul.getElementsByTagName("li");
    for (i = 1; i < li.length; i++) {
        content = li[i].getElementsByTagName("h6")[0];
        if (content.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";

        }
    }
}

function setSubNews(news) {
    $.each(news, function (key, body) {
        $('#news-collection').append(' ' +
            '<li class="collection-item">' +
            '   <div class="row">' +
            '       <div class="col s6">' +
            '           <h6 class="collections-title">' + body.Title + '</h6>' +
            '           <p class="collections-content">' + body.Description + '</p>' +
            (body.Link != '' ? '<a href="' + body.Link + '">Check the conntent</a>' : '') +
            '       </div>' +
            '   </div>' +
            '</li>');

    });
}

function setSubjectContent() {
    console.log("Ajax GET request to: " + urls.base + urls.subjectScope + '/' + $.session.get('subjectID'));
//    Get subject content
    $.ajax({
        type: "GET",
        url: urls.base + urls.subjectScope + '/' + $.session.get('subjectID'),
        headers: {
            // "Authorization": "" ,
            "x-auth": $.session.get('token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        success: function (data, textStatus, xhr) {
            if (xhr.status == 200 || xhr.status == 304) {
                console.log("Status: " + xhr.status);
                console.log("Data from GET Subjects: " + data.data);
            }
            else if (xhr.status == 400) {
                console.log("Error: " + xhr.status);
            }
            else if (xhr.status == 404) {
                console.log("Error: " + xhr.status);
            } else {
                console.log("Error: " + xhr.status);
            }
        }
    });
}

function submitPost() {
    console.log("Success submit post");
}

$(document).ready(function () {

    console.log("Subjects: " + $.session.get('subjects'));
    setSubjectContent();


});
