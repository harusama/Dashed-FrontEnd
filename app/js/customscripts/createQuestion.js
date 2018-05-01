// Validate if user is logger
$(function () {
    console.log($.session.get('StatusUser'));
    if (!$.session.get('StatusUser') || $.session.get('StatusUser') == 'Logout') {
        window.location.href = '../index.html';
    }

});

function loadQuestions(typeAnswer, type) {
    var template = (questionsType[type]);
    var answers = {};
    for (var i = 0; i < numInputs[type]; i++) {
        if (typeAnswer === 'input') {
            answers['inputLabel' + i] = '<input type="text" name="answer-' + (i + 1) + '" ><label>Answer ' + (i + 1) + '</label>';
        } else {
            answers['inputLabel' + i] = '<p></p>';
        }
    }
    if (typeAnswer === 'input') {
        answers.footer =
            '<div class="row card-action">' +
            '   <div class="input-field col s12">' +
            '       <button class="btn cyan waves-effect waves-light right" type="submit" name="action">Submit ' +
            '           <i class="material-icons right">send</i>' +
            '       </button>' +
            '   </div>' +
            '</div>';
    }
    $('#' + type).append(Mustache.render(template, answers));
}

$(document).ready(function () {

    loadQuestions('input', 'bridgemap');
    loadQuestions('input', 'bracemap');
    loadQuestions('input', 'mflowmap');
    loadQuestions('input', 'fmap');
    loadQuestions('input', 'dbubblemap');
    loadQuestions('input', 'cframemap');
    loadQuestions('input', 'treemap');
    loadQuestions('input', 'bubblemap');


    // Toggle from text input to file input
    $('.toggleInput').click(function (e) {
        e.preventDefault();
        $(this).closest('.row').find(':input').val("");

        $(this).closest('.row').find('.textInput').toggle();
        $(this).closest('.row').find('.imageInput').toggle();
    });

    // On submit function
    $(document).on('submit', '.submitQuestion:not(.toggleInput)', function (e) {

        e.preventDefault();

        var i = 1;
        var form = $(this).closest('form');
        var descriptionArea = $(this).parents('.row').prev('.description').find('.materialize-textarea');
        var answers = [];
        var question = {};
        // Get the closest form and from there the input not hidden
        var data = form.find(':input:not(:hidden)').serializeArray();
        $.each(data, function (key, body) {
            answers.push({
                "index": i,
                "text": body.value
            });
            i++;
        });

        // Get the closest text area content
        question["answers"] = answers;
        question['kind'] = form.attr('name');
        question['descriptionText'] = descriptionArea.val();
        question['descriptionImage'] = "";
        //Gets actual lesson id.
        var lessonId = parseInt($('#lessonIdSet').attr('lessonId'));
        // Request to API
        //TODO: Clear and reset all forms, and validate for complete input fields.
        $.ajax({
            type: "POST",
            url: urls.base + urls.questionScope,
            data: JSON.stringify({
                "descriptionText": descriptionArea.val(),
                "descriptionImage": "None",
                "kind": parseInt(form.attr('name')),
                "answers": answers,
                "lessonId": lessonId
            }),
            headers: {
                // "Authorization": "" ,
                "x-auth": $.session.get('token'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            success: function (data, textStatus, xhr) {
                console.log(data); // show response from the php script.
                if (xhr.status == 201) {
                    swal({
                        type: 'success',
                        position: 'top-end',
                        title: "Question submitted!",
                        text: "Text!",
                        timer: 1500
                    });
                    // Clean inputs
                    form.trigger("reset");
                    descriptionArea.val("");
                }
                else {
                    swal({
                        type: 'error',
                        position: 'top-end',
                        title: "Internal error",
                        text: "Please reload page and try again",
                        showCancelButton: true,
                        confirmButtonText: "Reload",
                        timer: 1500
                    }, function (isConfirm) {
                        if (isConfirm) {
                            location.reload();
                        }
                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.status);
                swal({
                    type: 'error',
                    position: 'top-end',
                    title: "Internal error",
                    text: "Please reload page and try again",
                    showCancelButton: true,
                    confirmButtonText: "Reload",
                    timer: 1500
                }, function (isConfirm) {
                    if (isConfirm) {
                        location.reload();
                    }
                });
            }
        });


        //todo: TEST DELETE AFTER TEST
        console.log(question);
        Cookies.remove('token');
    });
});


