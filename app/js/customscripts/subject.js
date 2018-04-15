var topic = [
    {
        "Topic": "Topic1",
        "Description": "Description topic 1"
    },
    {
        "Topic": "Topic2",
        "Description": "Description topic 2"
    },
    {
        "Topic": "Topic3",
        "Description": "Description topic 3"
    },
    {
        "Topic": "Topic4",
        "Description": "Description topic 4"
    }
];
var news = [
    {
        "Title": "New Question added",
        "Description": "New question added to History",
        "Link": ""
    },
    {
        "Title": "New subjects available ",
        "Description": "New question added to History",
        "Link": ""
    },
    {
        "Title": "New Question added",
        "Description": "New question added to History",
        "Link": "http://www.google.com"
    },

];

// Validate if user is logger
// $(function () {
//     console.log($.session.get('StatusUser') );
//     if (!$.session.get('StatusUser') || $.session.get('StatusUser') == 'Logout'){
//         window.location.href = '../index.html';
//     }
// });
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

$(document).ready(function () {

    // Load content from json value
    $(function () {
        $.each(topic, function (key, body) {

            $('#topic-collection').append(' ' +
                '<li class="collection-item">' +
                '   <div class="row">' +
                '       <div class="col s6">' +
                '           <h6 class="collections-title">' + body.Topic + '</h6>' +
                '           <p class="collections-content">' + body.Description + '</p>' +
                '       </div>' +
                '   </div>' +
                '</li>');

        });
    });
    $(function () {
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
    });

});
