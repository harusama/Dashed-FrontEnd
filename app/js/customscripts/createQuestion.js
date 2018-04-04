var url = 'https://dash-ed.herokuapp.com/v1/questions';
$(document).ready(function () {
    // Todo : for test proposes
    // Reference to use cookies https://github.com/js-cookie/js-cookie
    Cookies.set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjo" +
        "iSm9obiBEb2UiLCJTdGF0ZSI6IlR4In0.pVyxECimTKaw4Pdr0zI3o5cjKUnG3sIcTNmk9BcEM6A",{ expires: 7 });

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
        console.log(Cookies.get("token"));

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

        // Request to API
        $.ajax({
            type: "POST",
            url: url,
            data: question,
            headers: {
                // "Authorization": "" ,
                "X-API-KEY": Cookies.get("token"),
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


