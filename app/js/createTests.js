$(document).ready(function () {

    // Toggle from text input to file input
    $('.toggleInput').click(function (e) {
        e.preventDefault();
        $(this).closest('.row').find(':input').val("");

        $(this).closest('.row').find('.textInput').toggle();
        $(this).closest('.row').find('.imageInput').toggle();
    });

    // On submit function
    $('.submitQuestion:not(.toggleInput)').submit(function (e) {
        e.preventDefault();

        var i = 0;
        // Get the closest form and from there the input not hidden
        var data = $(this).closest('form').find(':input:not(:hidden)').serializeArray().reduce(function (obj, item) {
            // obj[item.name] = item.value;
            obj["answer" + i] = item.value;
            i++;
            return obj;
        }, {});
        // Get the closest text area content
        data['description'] = $(this).parents('.row').prev('.description').find('.materialize-textarea').val();

        // todo: TEST DELETE AFTER TEST
        var test = 'TEST \n';
        $.each(data, function (key, value) {
            test += key + " -> " + value + "\n";
        });
        alert(test);
        //
    });
});


