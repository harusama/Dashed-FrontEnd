var socket = io.connect(urls.chat);

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
   var username = $.session.get('username');
   var room = 'Error_With_Room';
   var chatRoom = $.session.get('chatRoom');

   if (chatRoom !== null && chatRoom !== '' && chatRoom.length !== 0) {
       room = chatRoom;
   }

   socket.emit('join', {'name': username, 'room': room}, function (err) {
      if (err) {
         alert(err);
         window.location.href = '/';
      } else {
         // console.log('No error.');
      }
   });
});

socket.on('disconnect', function () {
   console.log('Disconnected from server');
});

socket.on('updateUserList', function (users) {
   $('#users-collection').html('<li class="collection-item avatar"><i class= "material-icons cyan circle">account_box</i><h5 class="collection-header m-0">Users in chat</h5></li>');

   users.forEach(function (user) {
       var template = jQuery('#active-users-template').html();
       var html = Mustache.render(template, {
           username: user.name,
           userColor: user.color
       });
       jQuery('#users-collection').append(html);
      // $('#users-collection').append(
      //    '<li class="collection-item">' +
      //    '   <div class="row">' +
      //    '       <div class="col s6">' +
      //    '           <h6 class="collections-title" style="color:' + user.color + '">' + user.name + '</h6>' +
      //    '       </div>' +
      //    '   </div>' +
      //    '</li>'
      // );
   });
});
   
socket.on('newMessageLeft', function (message) {
   var template = jQuery('#message-template').html();
   addMessage(message, template);
});

socket.on('newMessageRight', function (message) {
   var template = jQuery('#message-right-template').html();
   addMessage(message, template);
});

socket.on('newMessageCenter', function (message) {
   var template = jQuery('#message-center-template').html();
   addMessage(message, template);
});

function addMessage(message, template) {
   var formattedTime = moment(message.createdAt).format('h:mm a');
   
   var html = Mustache.render(template, {
      from: message.from,
      text: message.text,
      color: message.color,
      createdAt: formattedTime
   });
   
   jQuery('#messages').append(html);
   scrollToBottom();
}

socket.on('newPost', function (post) {
   var template = jQuery('#post-template').html();
   var html = Mustache.render(template, {
      id: post.id,
      title: post.title,
      description: post.description,
      username: post.username,
      resource: post.resource
   });
   jQuery('#topic-collection-header').after(html);
});

socket.on('newComment', function (comment) {
   var template = jQuery('#comment-template').html();
   var html = Mustache.render(template, {
      id: comment.id,
      description: comment.description,
      username: comment.username,
   });
   jQuery('.collection-item.' + comment.postId + ' .comments').append(html);
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
   
   