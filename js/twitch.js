import dotenv from 'dotenv'
dotenv.config()
const TWITCH_AUTH_TOKEN = process.env[TWITCH_AUTH_TOKEN];
const TWITCH_CLIENT_ID = process.env[TWITCH_CLIENT_ID];
var twitchid = ''
var channel = window.location.href.split('?u=')[1] || '';

function checkForNew(chanid) {
    fetch('https://api.twitch.tv/helix/users?login='+chanid, {
        headers: {
            'Authorization': TWITCH_AUTH_TOKEN,
            'Client-Id': TWITCH_CLIENT_ID
        }
    })
    .then(res => res.json()).then(data => {
        twitchid = data.data[0].id
        title.innerHTML = data.data[0].display_name
        logo.src = data.data[0].profile_image_url
        type.innerHTML = data.data[0].broadcaster_type
        viewcount.innerHTML = data.data[0].view_count
    });
}


function updateStats(id) {
    fetch('https://api.twitch.tv/helix/users/follows?to_id='+id+'&first=1', {
        headers: {
            'Authorization': TWITCH_AUTH_TOKEN,
            'Client-Id': TWITCH_CLIENT_ID
        }
    })
    .then(res => res.json()).then(data => {
        followercount.innerHTML = data.total,
        graphstat.innerHTML = data.total
        var yep=(graphstat.innerHTML)
        console.log(yep)
        var injection=yep
        if(graph.series[0].points.length>=720)graph.series[0].data[0].remove();
        graph.series[0].addPoint([Date.now(),parseFloat(injection)])
    });
}

// Intervals
setInterval(() => {
    updateStats(twitchid);
}, 5000);
setInterval(() => {
    checkForNew(channel)
}, 60000);

checkForNew(channel)