var channel = window.location.href.split('?q=')[1] || '';

//twitch
function twitch_channel_load(chanid) {
    fetch("https://api.subscriberwars.space/twitch/channel/" + chanid).then(res => res.json()).then(data => {
        twitchid = data.iD
        page_title.innerHTML = data.name + "'s Live Twitch Follower Count"
        channel_title.innerHTML = data.name
        channel_slug.innerHTML = data.iD
        //channel_link.href = "https://twitch.tv/" + data.name
        channel_image.src = data.logo
        channel_banner.src = data.offlineImage
        channel_since.innerHTML = data.since
        //channel_sb.href = "https://socialblade.com/twitch/user/" + data.name
        if (data.type == "partner") { document.getElementById("partner").style.display = "inline" } else { document.getElementById("partner").style.width = "0px" }
        if (data.type == "partner") { document.getElementById("partner").title = "This channel is a Twitch Partner" }
        if (data.type == "affiliate") { document.getElementById("affiliate").style.display = "inline" } else { document.getElementById("affiliate").style.width = "0px" }
        if (data.type == "affiliate") { document.getElementById("affiliate").title = "This channel is a Twitch Affiliate" }
    })
}

function twitch_channel_stats(id) {
    fetch("https://api.subscriberwars.space/twitch/followers/" + id).then(res => res.json()).then(data => {
        channel_mainCount.innerHTML = data.total
        if (data.total >= 0) { goal01.innerHTML = 10 }
        if (data.total >= 10) { goal01.innerHTML = 100 }
        if (data.total >= 100) { goal01.innerHTML = 1000 }
        if (data.total >= 1000) { goal01.innerHTML = (Math.floor(data.total / 1000) * 1000) + 1000 }
        if (data.total >= 10000) { goal01.innerHTML = (Math.floor(data.total / 10000) * 10000) + 10000 }
        if (data.total >= 100000) { goal01.innerHTML = (Math.floor(data.total / 100000) * 100000) + 100000 }
        if (data.total >= 1000000) { goal01.innerHTML = (Math.floor(data.total / 1000000) * 1000000) + 1000000 }
        if (data.total >= 10000000) { goal01.innerHTML = (Math.floor(data.total / 10000000) * 10000000) + 10000000 }
        if (data.total >= 100000000) { goal01.innerHTML = (Math.floor(data.total / 100000000) * 100000000) + 100000000 }
        channel_goal.innerHTML = goal01.innerHTML - data.total
        const subscriberCount = parseInt(data.total, 10);
            const sub0 = subscriberCount;

            if (sub0) {
                const series = twitch_channelGraph.series[0];
                if (series.data.length >= 360) {
                    series.data[0].remove();
                }
                series.addPoint([Date.now(), subscriberCount], true, false);
                const allData = series.data.length > 0 ? series.data.map(point => point.y) : [subscriberCount];
                const minDataPoint = Math.min(...allData);
                twitch_channelGraph.yAxis[0].update({ min: minDataPoint });
            }
    })
}