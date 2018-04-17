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

function createPostRequest(data) {
    console.log("\nData create new post: " + JSON.stringify(data));
    //POST request for creating post. https://dash-ed.herokuapp.com/v1/posts
    $.ajax({
        type: "POST",
        url: urls.base + urls.postScope,
        data: JSON.stringify({
            "title": data.title,
            "description": data.description,
            "resource": data.resource,
            "kind": data.kind,
            "subjectId": parseInt(data.subjectId)
        }),
        dataType: "json",
        headers: {
            // "Authorization": "" ,
            "x-auth": $.session.get('token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },

        complete: function (xhr, settings) {
            if (xhr.status == 201) {
                console.log("Status: " + xhr.status);
            }
            else if (xhr.status == 404) {
                console.log("Status: " + xhr.status);

            }
            else if (xhr.status == 400) {
                console.log("Status: " + xhr.status);

            } else {
                console.log("Status: " + xhr.status);
            }
        }
    });
}

function toggleBetweenPostSubj() {
    $('#subjectContainer').toggle();
    $('#postContainer').toggle();
}

$(document).ready(function () {

    console.log("Subjects: " + $.session.get('subjects'));
    setSubjectContent();

    // $('.goToPost').on('click', function (e) {
    //     e.preventDefault();
    //     console.log("Success go to post");
    //
    //     toggleBetweenPostSubj();
    // });

    $('.createPost').submit(function (e) {
        e.preventDefault();

        var formData = $(this).serializeArray();
        var data = {"title":"noTitle","description":"noDescription","resource":"noresource","kind":"noKind","subjectId":"noSubjectID"};

        console.log("Before Data from form:" +  JSON.stringify(data));

        switch ($(this).attr('id'))
        {
            case "postQuestion":
                console.log("Success case post: " + $(this).attr('id'));
                data = {"title":formData[0].value,"description":formData[1].value,"resource":"noresource","kind":$(this).attr('kind'),"subjectId":$.session.get('subjectID')};
                break;
            case "postContent":
                console.log("Success case post: " + $(this).attr('id'));
                data = {"title":formData[0].value,"description":formData[1].value,"resource":"noresource","kind":$(this).attr('kind'),"subjectId":$.session.get('subjectID')};
                break;
            case "postResource":
                console.log("Success case post: " + $(this).attr('id'));
                data = {"title":formData[0].value,"description":"noDescription","resource":formData[1].value,"kind":$(this).attr('kind'),"subjectId":$.session.get('subjectID')};
                break;
            case "postTestimony":
                console.log("Success case post: " + $(this).attr('id'));
                data = {"title":"noTitle","description":formData[0].value,"resource":"noresource","kind":$(this).attr('kind'),"subjectId":$.session.get('subjectID')};
                break;
            default:
                console.log("Success Default: " + $(this).attr('id'));
                break;
        }
        console.log("After Data from form stringified:" +  JSON.stringify(data));
        $(this).trigger('reset');
        createPostRequest(data);
    });
});
