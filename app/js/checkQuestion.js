// Todo: Delete this, test proposes
// ->
var questions = [
    {
        "kind": 1,
        "descriptionText": "non officia magna aliqua",
        "descriptionImage": "tempor laboris exercitation",
        "answers": [
            {
                "text": "sit esse ad laborum ullamco",
                "index": 1
            },
            {
                "index": 2,
                "text": "exercitation irure"
            },
            {
                "index": 3,
                "text": "exercitation irure"
            },
            {
                "index": 4,
                "text": "exercitation irure"
            }
        ]
    },
    {
        "kind": 2,
        "descriptionText": "exercitation minim ullamco non dolor",
        "descriptionImage": "eu mollit amet pariatur",
        "answers": [
            {
                "index": 16,
                "text": "of"
            },
            {
                "text": "qui aliqua commodo amet",
                "index": 16
            }
        ]
    },
    {
        "kind": 3,
        "descriptionText": "velit ad commodo",
        "descriptionImage": "consequat",
        "answers": [
            {
                "index": 15,
                "text": "Excepteur Ut aute"
            },
            {
                "index": 7,
                "text": "deserunt in sed dolor"
            },
            {
                "text": "qui ullamco quis incididunt",
                "index": 18
            },
            {
                "index": 16,
                "text": "anim enim aute"
            },
            {
                "text": "ad dolore enim officia ut",
                "index": 17
            }
        ]
    },
    {
        "kind": 7,
        "descriptionText": "aliquip in",
        "descriptionImage": "aute nostrud enim nisi",
        "answers": [
            {
                "text": "nulla sunt exercitation pariatur nostrud",
                "index": 4
            },
            {
                "index": 18,
                "text": "minim occaecat"
            },
            {
                "text": "proident culpa incididunt Ut",
                "index": 9
            },
            {
                "index": 13,
                "text": "velit"
            },
            {
                "index": 19,
                "text": "dolor esse"
            }
        ]
    }
];
// <-

function getQuestion(body) {
    var questionImage, answer = '';
    $.each(body.answers, function (key, ans) {
        answer += '<li>' + ans.text + '</li>'
    });

    switch (body.kind) {
        case 1:
            questionImage = 'bridgeMap.PNG';
            break;
        case 2:
            questionImage = 'mFlowMap.PNG';
            break;
        case 3:
            questionImage = 'flowMap.PNG';
            break;
        case 4:
            questionImage = 'dBubbleMap.PNG';
            break;
        case 5:
            questionImage = 'dBubbleMap.PNG';
            break;
        case 6:
            questionImage = 'cFrameMap.PNG';
            break;
        case 7:
            questionImage = 'treeMap.PNG';
            break;
        case 8:
            questionImage = 'braceMap.PNG';
            break;
    }
    return '<div class="row">' +
        '    <div class="card">' +
        '        <div class="card-content">' +
        '            <div class="input-field col s6">' +
        '                <h5>Description</h5>' +
        '                <p class="description">' + body.descriptionText + '</p>' +
        '            </div>' +
        '            <div class="card-image col s6 ">' +
        '                <img src="assets/images/questions/' + questionImage + '">' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>' +
        '<div class="row card">' +
        '    <div class="card-content">' +
        '       <ol class="questions">' +
        answer +
        '       </ol>' +
        '    </div>' +
        '   <div class="right-align card-action ">' +
        '       <button class="btn-floating  waves-effect waves-light green approve"> ' +
        '           <i class="material-icons right">done</i>' +
        '       </button>' +
        '       <button class="btn-floating  waves-effect waves-light red reject"> ' +
        '           <i class="material-icons right">highlight_off</i>' +
        '       </button>' +
        '   </div>' +
        '</div>';

}

$(document).ready(function () {
    $('.collapsible').collapsible();
    $(function () {
        $.each(questions, function (key, body) {
            var question = getQuestion(body);

            $('#question-list').append(
                '<li id="question' + key + '">' +
                '   <div class="collapsible-header">\n' +
                '       <i class="material-icons">question_answer</i>' + body.descriptionText +
                '   </div>' +
                '   <div class="collapsible-body">' +
                question +
                '   </div>' +
                '</li>');

        });
    });
    $(document).on('click', '.approve', function (e) {
        e.preventDefault();
        swal({
            type: 'success',
            position: 'top-end',
            title: "Question Approved!",
            text: "Text!",
            timer: 1500
        });
        // $("li, div").removeClass("active");
        $(this).closest('li.active').hide();
        // $(this).closest('li.active').hide();
        // li.removeClass('active');
        // li.closest('div.collapsible-header').removeClass('active');
        // li.closest('div.collapsible-body').removeClass('active');

    });
    $(document).on('click', '.reject', function (e) {
        e.preventDefault();
        swal({
            type: "input",
            closeOnConfirm: false,
            // showCancelButton: true,
            inputPlaceholder: "Reason",
            title: "Question Rejected!"
        }, function (inputValue) {
            if (inputValue === false) return false;
            if (inputValue === "") {
                swal.showInputError("You need to write something!");
                return false
            }
            swal("Nice!", "You wrote: " + inputValue, "success");
        });
        $(this).closest('li.active').hide();
    });

});
