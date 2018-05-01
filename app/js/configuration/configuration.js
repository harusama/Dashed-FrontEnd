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
urls.postScope = 'posts';
urls.commentScope = 'comments';
urls.commentVoteUpdate = 'comments';
urls.approveQuestion = '/approved/';


//Session
// var userSession = "";

function setUserToken(xhr) {
    $.session.set('token', xhr.getResponseHeader('x-auth'));
}
function setUserSessionData(data) {
    Cookies.set("userData", data);
    console.log("Set user session data: " + JSON.stringify(data.data));
    $.session.set('userData', data.data);
    $.session.set('username', data.data.username);
    $.session.set('name', data.data.firstName);
    $.session.set('lname', data.data.lastName);
    $.session.set('currency', data.data.coins);
    $.session.set('milestone', data.data.experience);
    $.session.set('StatusUser', 'Login');
    $.session.set('subjects', JSON.stringify(data.data.subjects));
    // userSession = $.session.get();
}

function subjectID(subjectID, subjectKey) {

    //Sets subject id for use
    $.session.set('subjectID', subjectID);
    console.log("subject ID: ", subjectID, " SubjectKey: ", subjectKey);
    $.session.set('subjectKey', subjectKey);

    //Sets subject room
    var subjectRoom = JSON.parse($.session.get('subjects'));
    $.session.set('chatRoom', subjectRoom[subjectKey].name);
    console.log("News Subject Room: " + subjectRoom[subjectKey].name);
}

