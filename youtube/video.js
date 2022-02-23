var video = window.location.href.split('?v=')[1] || '';
var capi = 0;
var lapi = 0;
var likes = 0;
var views = 0;
var viewsC = 0;
var lol = 0;

function updateStats(id) {
    fetch('https://api.subscriberwars.space/youtube/video/'+id+'').then(res => res.json()).then(data => {
        capi = data.statistics.viewCount
        lapi = data.statistics.likeCount

    var ratio = parseFloat(capi) / parseFloat(lapi)
                console.log(ratio)
                    views = (Math.floor(parseFloat(views) + ratio * (parseFloat(lapi) - likes)))
                        if (viewsC == capi) { } else {
                            views = (Math.floor(parseFloat(capi)))
                        }
                viewsC = (Math.floor(capi))
                likes = (Math.floor(lapi))
                lol = views
        likecount.innerHTML = data.statistics.likeCount,
        commentcount.innerHTML = data.statistics.commentCount,
        viewscount.innerHTML = lol,
        title.innerHTML = data.title,
        logo.src = data.thumbnails.maxres.url,
        dislikecount.innerHTML=data.statistics.dislikeCount
    });
}

// Intervals
setInterval(() => {
    updateStats(video);
}, 10000);

updateStats(video)