var subjects = [
    {
        "subjectID": 1,
        "subjectName": "Subject 1",
        "CampusType": "CampusType 1",
        "genderTopic": "Math",
        "contentName": "Math 1",
        "ContentDescription": "Math Description 1",
        "units": [
            {
                "unitID": 1,
                "unitNumber": 1,
                "unitName": "S1 Unit 1",
                "unitDescription": "S1 Unit D",
                "chapters": [
                    {
                        "chapterID": 1,
                        "chapterNumber": 1,
                        "chapterName": "Chapter Name 1",
                        "chapterDescription": "Chapter Description 1",
                        "lessons": [
                            {
                                "lessonID": 1,
                                "lessonNumber": 1,
                                "lessonName": "Lesson Name 1",
                                "lessonDescription": "Lesson Description 1"
                            },
                            {
                                "lessonID": 2,
                                "lessonNumber": 1,
                                "lessonName": "Lesson Name 2",
                                "lessonDescription": "Lesson Description 2"
                            }
                        ]
                    },
                    {
                        "chapterID": 2,
                        "chapterNumber": 2,
                        "chapterName": "Chapter Name 2",
                        "chapterDescription": "Chapter Description 2",
                        "lessons": [
                            {
                                "lessonID": 1,
                                "lessonNumber": 1,
                                "lessonName": "Lesson Name 1",
                                "lessonDescription": "Lesson Description 1"
                            },
                            {
                                "lessonID": 2,
                                "lessonNumber": 1,
                                "lessonName": "Lesson Name 2",
                                "lessonDescription": "Lesson Description 2"
                            }
                        ]
                    }
                ]
            },
            {
                "unitID": 2,
                "unitNumber": 2,
                "unitName": "S1 Unit 2",
                "unitDescription": "S1 Unit D",
                "chapters": [
                    {
                        "chapterID": 2,
                        "chapterNumber": 2,
                        "chapterName": "Chapter Name 1",
                        "chapterDescription": "Chapter Description 1",
                        "lessons": [
                            {
                                "lessonID": 1,
                                "lessonNumber": 1,
                                "lessonName": "Lesson Name 1",
                                "lessonDescription": "Lesson Description 1"
                            },
                            {
                                "lessonID": 2,
                                "lessonNumber": 1,
                                "lessonName": "Lesson Name 2",
                                "lessonDescription": "Lesson Description 2"
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

// Validate if user is logger
$(function () {
    console.log($.session.get('StatusUser'));
    if (!$.session.get('StatusUser') || $.session.get('StatusUser') == 'Logout') {
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

// <script id="comment-template" type="text/template">
//     <li class="comment {{id}}">
//     <h6 class="collections-title username">{{username}}</h6>
// <p class="collections-content">{{description}}</p>
// </li>
// </script>
function fillPosts(post) {
    console.log('fillSubjectPosts: ', post);
    $.each(post, function (key, body) {
        var template = jQuery('#post-template').html();
        var html = Mustache.render(template, {
            id: body.id,
            title: body.title,
            description: body.description,
            username: body.username,
            resource: body.resource
        });
        jQuery('#topic-collection').append(html);

        // console.log("comments array: " + body.comments);
        $.each(body.comments, function (key, body) {
            // console.log("Comments: " + body.id);
            var comment = jQuery('#comment-template').html();
            var html = Mustache.render(comment, {
                id: body.id,
                description: body.description,
                username: body.userId,
            });
            jQuery('#comment-post-' + body.id).append(html);
        });
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
                fillPosts(data.data.posts);
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


function getUnits(unit) {
    var html = '';
    $.each(unit, function (key, body) {
        html +=
            '<li> ' +
            '       <div class="collapsible-header">' +
            '           <i class="material-icons">list</i> Unit ' + ' ' + body.unitNumber + ' - ' + body.unitName +
            '            <a class="btn-floating  waves-effect waves-light Add-Element" id="u-' + body.unitID + '"><i class="material-icons">add</i></a>' +
            '       </div>' +
            '       <div class="collapsible-body">' +
            '           <div class="row">' +
            '               <div class="col s12 m12">' +
            '                   <ul class="collapsible" data-collapsible="accordion">' +
            getChapters(body.chapters, body.unitID) +
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
            '       <i class="material-icons">line_weight</i>Chapter ' + ' ' + body.chapterNumber + ' - ' + body.chapterName +
            '            <a class="btn-floating  waves-effect waves-light Add-Element" id="u-' + idUnit + '-ch-' + body.chapterID + '"><i class="material-icons">add</i></a>' +
            '   </div>' +
            '   <div class="collapsible-body">' +
            '           <div class="row">' +
            '               <div class="col s12 m12">' +
            '                   <ul class="collapsible" data-collapsible="accordion">' +
            getLessons(body.lessons, idUnit, body.chapterID) +
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
            '           <i class="material-icons">label</i>' + body.lessonName +
            '            <a class="btn-floating  waves-effect waves-light Add-Element" id="u-' + idUnit + '-ch-' + chpaterID + '-L-' + body.lessonID + '"><i class="material-icons">add</i></a>' +

            '       </div>' +
            '      <div class="collapsible-body">' +
            '           <p>' + body.lessonDescription + '</p>' +
            '       </div>' +
            '</li>'

    });
    return html;

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

    $(function () {
        $.each(subjects, function (key, body) {
            $('#subject-collection').append(getUnits(body.units));

        });
        //This function (collapsible) must be her to load de content dynamically
        $('.collapsible').collapsible();

    });

    $('div').on('click', 'a.Add-Element', function (event) {
        event.stopPropagation();
        // alert("target = " + event.target.tagName + ", this=" + this.tagName);
        $('#sujectsElements-collections').append(
            '<div class="chip">' +
            this.id +
            '   <i class="close material-icons">close</i>' +
            '</div>'
        );
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
});
