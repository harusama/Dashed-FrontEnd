$(document).ready(function () {

    // Toggle from text input to file input
    $('.toggleInput').click(function (e) {
        e.preventDefault();
        $(this).closest('.row').find(':input').val("");

        $(this).closest('.row').find('.textInput').toggle();
        $(this).closest('.row').find('.imageInput').toggle();
    });

    // On submit function
    $('.submitQuestion:not(.toggleInput)').on('submit', function (e) {

        // $('.submitQuestion:not(.toggleInput)').submit(function (e) {

        e.preventDefault();
        alert("Sumit Fomr");
        var i = 1;
        var form = $(this).closest('form');
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
        question['descriptionText'] = $(this).parents('.row').prev('.description').find('.materialize-textarea').val();
        question['descriptionImage'] = "";

        console.log(question);
        // // todo: TEST DELETE AFTER TEST
        // var test = 'TEST \n';
        // $.each(data, function (key, value) {
        //     test += key + " -> " + value + "\n";
        // });
        // alert(test);
        //
    });
});


