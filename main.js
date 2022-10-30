const CLIENT_ID='728789317432-fr8u4kthe7d721g4ab5u6hpkvoiooj4g.apps.googleusercontent.com';
const DISCOVERY_DOCS=['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'];
const SCOPES='https://www.googleapis.com/auth/youtube.readonly';
const authorizeButton=document.getElementById('authorize-button');
const signoutButton=document.getElementById('signout-button');
const content=document.getElementById('content');
const channelForm=document.getElementById('channel-form');
const channelInput=document.getElementById('channel-input');
const videoContainer=document.getElementById('video-container');
const defaultChannel='subscriberwars1';

//Load auth2 library
function handleClientLoad(){
    gapi.load('client:auth2',initClient);
}

//Init API client library sign in listeners

function initClient(){
    gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientID: CLIENT_ID,
        scope: SCOPES
    }).then(()=>{
        //sign in state changes
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        // handle initial state
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick=handleAuthClick;
        signoutButton.onclick=handleSignoutClick;
    });
}

//update ui state changes
function updateSigninStatus(isSignedIn){
    if(isSignedIn){
        authorizeButton.style.display='none';
        signoutButton.style.display='block';
        content.style.display='block';
        videoContainer.style.display='block';
        getChannel(defaultChannel);
    } else{
        authorizeButton.style.display='block';
        signoutButton.style.display='none';
        content.style.display='none';
        videoContainer.style.display='none';
    }
}

//handle login
function handleAuthClick(){
    gapi.auth2.getAuthInstance().signIn();
}

//handle logout
function handleSignoutClick(){
    gapi.auth2.getAuthInstance().signOut();
}

//get channel from api
function getChannel(channel) {
    console.log(channel);
}