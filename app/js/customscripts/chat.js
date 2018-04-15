//var socket = io();

var socket = io.connect('localhost:3000');

function scrollToBottom() {
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    console.log('Connected to server');
    var params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error.');
        }
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('updateUserList', function (users) {

   $('#users-collection').html('<li class="collection-item avatar"><i class= "material-icons cyan circle">account_box</i><h5 class="collection-header m-0">Users in chat</h5></li>');

    users.forEach(function (user) {
        $('#users-collection').append(
            '<li class="collection-item">' +
            '   <div class="row">' +
            '       <div class="col s6">' +
            '           <h6 class="collections-title">' + user + '</h6>' +
            '       </div>' +
            '   </div>' +
            '</li>');
    });
});

socket.on('newMessage', function (message) {
   console.log('message', message);
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        color: message.color,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newMessageLeft', function (message) {
   console.log('messageLeft', message);
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-right-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,
       color: message.color,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newMessageCenter', function (message) {
   console.log('messageCenter', message);
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-center-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,
       color: message.color,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});


$(document).ready(function () {
    $('#message-form').submit(function (e) {
        e.preventDefault();

        var messageTextbox = $(this).find(':input');

        socket.emit('createMessage', {
            text: messageTextbox.val()
        }, function () {
            messageTextbox.val('');
        });
    });

});

