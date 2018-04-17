//Base URL

var urls = {};
//Server
// urls.base = 'https://dash-ed-api.herokuapp.com/v1/';
// urls.chat = 'https://dash-ed-api.herokuapp.com/';

//Local
urls.base = 'http://localhost:3000/v1/';
urls.chat = 'http://localhost:3000/';

//Relatives
urls.usersScope = 'users/';
urls.questionScope = 'questions';
urls.stateScope = 'states';
urls.subjectScope = 'subjects';

//Session
// var userSession = $.session.get('userData');

function setUserSessionData(data, xhr) {
    Cookies.set("userData", data);
    console.log(data.data);
    $.session.set('userData', data.data);
    $.session.set('username', data.data.username);
    $.session.set('name', data.data.firstName);
    $.session.set('lname', data.data.lastName);
    $.session.set('currency', data.data.coins);
    $.session.set('milestone', data.data.experience);
    $.session.set('StatusUser', 'Login');
    $.session.set('token', xhr.getResponseHeader('x-auth'));
    $.session.set('subjects', JSON.stringify(data.data.subjects));
}

function subjectChat(subjectRoom) {
    $.session.set('chatRoom', subjectRoom);
    console.log("subject room: " + subjectRoom);
}

