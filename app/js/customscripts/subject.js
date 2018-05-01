// Validate if user is logger
$(function () {
    console.log($.session.get('StatusUser'));
    if (!$.session.get('StatusUser') || $.session.get('StatusUser') == 'Logout') {
        window.location.href = '../index.html';
    }
});

//TODO: This needs to be re-factorized.
function setUnits(unit) {
    var html = '';
    $.each(unit, function (key, body) {
        html +=
            '<li> ' +
            '       <div class="collapsible-header">' +
            '           <i class="material-icons">list</i> Unit ' + ' ' + body.number + ' - ' + body.name +
            '       </div>' +
            '       <div class="collapsible-body">' +
            '           <div class="row">' +
            '               <div class="col s12 m12">' +
            '                   <ul class="collapsible popout" data-collapsible="accordion">' +
            setChapters(body.chapters, body.id) +
            '                   </ul>' +
            '               </div>' +
            '           </div>' +
            '       </div>' +
            '</li>'

    });
    return html;

}

function setChapters(chapter) {
    var html = '';
    $.each(chapter, function (key, body) {

        html +=
            '<li > ' +
            '   <div class="collapsible-header">' +
            '       <i class="material-icons">line_weight</i>Chapter ' + ' ' + body.number + ' - ' + body.name +
            '   </div>' +
            '   <div class="collapsible-body">' +
            '           <div class="row">' +
            '               <div class="col s12 m12">' +
            '                   <ul class="collapsible popout" data-collapsible="accordion">' +
            setLessons(body.lessons) +
            '                   </ul>' +
            '               </div>' +
            '           </div>' +
            '   </div>' +
            '</li>'


    });
    return html;

}

function setLessons(lesson) {
    var html = '';
    $.each(lesson, function (key, body) {
        html +=
            '<li>' +
            '       <div class="collapsible-header">' +
            '           <i class="material-icons">label</i>' + body.name +
            '       </div>' +
            '      <div class="collapsible-body">' +
            '           <p>' + body.description + '</p>' +
            '           <a class="waves-effect waves-light btn blue white-text right" onclick="setLesonId(' + body.id + ')">Select</a>' +
            '       </div>' +
            '</li>'

    });
    return html;

}

function setLesonId(lessonId) {
    $('#lessonIdSet').text("Lesson selected: " + lessonId);
    $('#lessonIdSet').attr('lessonId', lessonId);
    console.log("Lesson ID: ", $('#lessonIdSet').attr('lessonId'));
}

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

function fillNews(news) {
    console.log("Subject News: ", news);
    $.each(news, function (key, body) {
        var template = jQuery('#news-subject-template').html();
        var html = Mustache.render(template, {
            id: body.id,
            title: body.name,
            date: body.datePublished,
            link: body.resource
        });
        jQuery('#news-collection').append(html);
    });
}

function fillPosts(posts) {

    posts = posts.reverse();
    $.each(posts, function (key, body) {
        var template = jQuery('#post-template').html();
        var html = Mustache.render(template, {
            id: body.id,
            title: body.title,
            description: body.description,
            username: body.username,
            resource: body.resource,
            createdAt: body.createdAt
        });
        $('#topic-collection').append(html);

        console.log("comments array: ", body.comments);
        $.each(body.comments, function (key, cBody) {
            var comment = jQuery('#comment-template').html();
            var html = Mustache.render(comment, {
                id: cBody.id,
                description: cBody.description,
                username: cBody.userId,
            });
            console.log("Comments complete: ", html);
            $('#comment-post-' + body.id).append(html);
        });
    });
}

function fillSubjects(units) {
    $('#subject-collection').append(getUnits(units));
    $('#create-question-collection').append(setUnits(units));
    //This function (collapsible) must be her to load de content dynamically
    $('.collapsible').collapsible();
}

function setSubjectContent() {
    //console.log("Ajax GET request to: " + urls.base + urls.subjectScope + '/' + $.session.get('subjectID'));
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
                //console.log("Status: ", xhr.status);
                // console.log("Data from GET Subjects: ", data.data);
                fillPosts(data.data.posts);
                fillNews(data.data.news);
                fillSubjects(data.data.units);

                //Store subject information
                $.session.set("subjectPosts", JSON.stringify(data.data.posts));
                console.log("Posts", JSON.parse($.session.get('subjectPosts')));
                $.session.set("subjectNews", JSON.stringify(data.data.news));
                console.log("News", JSON.parse($.session.get('subjectNews')));
                $.session.set("subjectUnits", JSON.stringify(data.data.units));
                console.log("Units", JSON.parse($.session.get('subjectUnits')));
                $('#dashboardTitle').text(JSON.parse($.session.get('subjects'))[$.session.get('subjectKey')].name);
                console.log("Set Subject Title: ", JSON.parse($.session.get('subjects'))[$.session.get('subjectKey')].name, " - KeyID: ", $.session.get('subjectKey'));
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
    console.log("\nData create new post: ", data);
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
                console.log("Status: ", xhr.status);
            }
            else if (xhr.status == 404) {
                console.log("Status: ", xhr.status);

            }
            else if (xhr.status == 400) {
                console.log("Status: ", xhr.status);

            } else {
                console.log("Status: ", xhr.status);
            }
        }
    });
}

function addPostComment(id) {
    console.log("\nData create new comment: ", id);
    //Get information from text area.
    var description = $('#addPostComment' + id).serializeArray()[0].value;
    //POST request for creating comment on post. https://dash-ed.herokuapp.com/v1/comments
    console.log("url: ", urls.base + urls.commentScope);
    console.log("ID: ", id);
    console.log("Description: ", description);
    console.log("postID", id);
    console.log("subjectID", parseInt($.session.get('subjectID')));

    $.ajax({
        type: "POST",
        url: urls.base + urls.commentScope,
        data: JSON.stringify({
            "description": description,
            "postId": parseInt(id),
            "subjectId": parseInt($.session.get('subjectID'))
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
                console.log("Status: ", xhr.status);
                $('#addPostComment' + id).trigger('reset');
            }
            else if (xhr.status == 404) {
                console.log("Status: ", xhr.status);

            }
            else if (xhr.status == 400) {
                console.log("Status: ", xhr.status);

            } else {
                console.log("Status: ", xhr.status);
            }
        }
    });
}

function toggleBetweenPostSubj() {
    $('#subjectContainer').toggle();
    $('#postContainer').toggle();
}

function getUnits(unit) {
    var html = '';
    $.each(unit, function (key, body) {
        html +=
            '<li> ' +
            '       <div class="collapsible-header">' +
            '           <i class="material-icons">list</i> Unit ' + ' ' + body.number + ' - ' + body.name +
            '           <a class="waves-effect waves-light btn Add-Element" id="u-' + body.id + '">Add</a>' +
            '       </div>' +
            '       <div class="collapsible-body">' +
            '           <div class="row">' +
            '               <div class="col s12 m12">' +
            '                   <ul class="collapsible" data-collapsible="accordion">' +
            getChapters(body.chapters, body.id) +
            '                   </ul>' +
            '               </div>' +
            '           </div>' +
            '       </div>' +
            '</li>'

    });
    return html;

}

function getChapters(chapter, idUnit) {
    var html = '';
    $.each(chapter, function (key, body) {

        html +=
            '<li > ' +
            '   <div class="collapsible-header">' +
            '       <i class="material-icons">line_weight</i>Chapter ' + ' ' + body.number + ' - ' + body.name +
            '           <a class="waves-effect waves-light btn Add-Element" id="u-' + idUnit + '-ch-' + body.id + '">Add</a>' +
            '   </div>' +
            '   <div class="collapsible-body">' +
            '           <div class="row">' +
            '               <div class="col s12 m12">' +
            '                   <ul class="collapsible" data-collapsible="accordion">' +
            getLessons(body.lessons, idUnit, body.id) +
            '                   </ul>' +
            '               </div>' +
            '           </div>' +
            '   </div>' +
            '</li>'


    });
    return html;

}

function getLessons(lesson, idUnit, chpaterID) {
    var html = '';
    $.each(lesson, function (key, body) {
        html +=
            '<li>' +
            '       <div class="collapsible-header">' +
            '           <i class="material-icons">label</i>' + body.name +
            '           <a class="waves-effect waves-light btn Add-Element" id="u-' + idUnit + '-ch-' + chpaterID + '-L-' + body.id + '">Add</a>' +
            '       </div>' +
            '      <div class="collapsible-body">' +
            '           <p>' + body.description + '</p>' +
            '       </div>' +
            '</li>'

    });
    return html;

}

function disabledEventPropagation(event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    }
    else if (window.event) {
        window.event.cancelBubble = true;
    }
}

function initMaterialize() {
    $('.dropdown-button').dropdown({
            inDuration: 300,
            outDuration: 225,
            constrainWidth: false, // Does not change width of dropdown to that of the activator
            hover: true, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: false, // Displays dropdown below the button
            alignment: 'left', // Displays dropdown with edge aligned to the left of button
            stopPropagation: true // Stops event propagation
        }
    );
}

function updateVotes(type, id, action) {

    var data = {
        "action": action
    };
    if (type === 'comment'){
        data.commentId = id;
    }
    else {
        data.postId = id
    }

    $.ajax({
        type: "POST",
        url: urls.base + urls.commentVoteUpdate,
        data: data,
        dataType: "json",
        headers: {
            // "Authorization": "" ,
            "x-auth": $.session.get('token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },

        complete: function (xhr, settings) {
            if (xhr.status == 201) {
                console.log("Status: ", xhr.status);
                $('#addPostComment' + id).trigger('reset');
            }
            else if (xhr.status == 404) {
                console.log("Status: ", xhr.status);

            }
            else if (xhr.status == 400) {
                console.log("Status: ", xhr.status);

            } else {
                console.log("Status: ", xhr.status);
            }
        }
    });
}

$(document).ready(function () {

    // console.log("Subjects: " + $.session.get('subjects'));
    setSubjectContent();
    initMaterialize();

    // $('.goToPost').on('click', function (e) {
    //     e.preventDefault();
    //     console.log("Success go to post");
    //
    //     toggleBetweenPostSubj();
    // });

    $('div').on('click', 'a.Add-Element', function (event) {
        disabledEventPropagation(event);

        // alert("target = " + event.target.tagName + ", this=" + this.tagName);
        var ids = $.map($('#sujectsElements-collections > div'), function (child) {
            return child.id;
        });

        var parentDiv = $('#' + this.id).closest('li');
        parentDiv.find('a').attr("disabled", true);

        if (ids.indexOf(this.id) < 0) {
            console.log("added");
            $('#sujectsElements-collections').append(
                '<div class="chip">' +
                this.id +
                '   <i class="close material-icons ' + this.id + '">close</i>' +
                '</div>'
            );
        }
    });

    $('body').on('click', 'i.close', function (event) {
        event.preventDefault();
        var id = $(this).closest('div').text().split(" ")[0];
        var parentDiv = $('#' + id).closest('li');
        parentDiv.find('a').attr("disabled", false);

    });


    $('.createPost').submit(function (e) {
        e.preventDefault();

        var formData = $(this).serializeArray();
        var data = {
            "title": "noTitle",
            "description": "noDescription",
            "resource": "noresource",
            "kind": "noKind",
            "subjectId": "noSubjectID"
        };

        console.log("Before Data from form:" + JSON.stringify(data));

        switch ($(this).attr('id')) {
            case "postQuestion":
                console.log("Success case post: " + $(this).attr('id'));
                data = {
                    "title": formData[0].value,
                    "description": formData[1].value,
                    "resource": "noresource",
                    "kind": $(this).attr('kind'),
                    "subjectId": $.session.get('subjectID')
                };
                break;
            case "postContent":
                console.log("Success case post: " + $(this).attr('id'));
                data = {
                    "title": formData[0].value,
                    "description": formData[1].value,
                    "resource": "noresource",
                    "kind": $(this).attr('kind'),
                    "subjectId": $.session.get('subjectID')
                };
                break;
            case "postResource":
                console.log("Success case post: " + $(this).attr('id'));
                data = {
                    "title": formData[0].value,
                    "description": "noDescription",
                    "resource": formData[1].value,
                    "kind": $(this).attr('kind'),
                    "subjectId": $.session.get('subjectID')
                };
                break;
            case "postTestimony":
                console.log("Success case post: " + $(this).attr('id'));
                data = {
                    "title": "noTitle",
                    "description": formData[0].value,
                    "resource": "noresource",
                    "kind": $(this).attr('kind'),
                    "subjectId": $.session.get('subjectID')
                };
                break;
            default:
                console.log("Success Default: " + $(this).attr('id'));
                break;
        }
        console.log("After Data from form stringified:" + JSON.stringify(data));
        $(this).trigger('reset');
        createPostRequest(data);
    });
    $('body').on('click', 'button.downvote', function (event) {
        event.preventDefault();
        var classes = $(this).closest('li').attr('class').split(/\s+/);
        var id_elemnt = classes.slice(-1)[0];
        var type_element = 'post';
        $.each(classes, function (key, body) {
            if (body === 'comment'){
                type_element = 'comment';
                return false;
            }
        });
        // Todo: fix the endpoint to update the vote in post or comment
        // updateVotes(type_element,id_elemnt,'downvote');
        alert("down vote the "+ type_element + " with id " + id_elemnt);
    });
    $('body').on('click', 'button.upvote', function (event) {
        event.preventDefault();
        var classes = $(this).closest('li').attr('class').split(/\s+/);
        var id_elemnt = classes.slice(-1)[0];
        var type_element = 'post';
        $.each(classes, function (key, body) {
            if (body === 'comment'){
                type_element = 'comment';
                return false;
            }
        });
        // Todo: fix the endpoint to update the vote in post or comment
        // updateVotes(type_element,id_elemnt,'upvote');
        alert("up vote the "+ type_element + " with id " + id_elemnt);
    });

});
