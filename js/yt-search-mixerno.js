$(document).ready(function(){

    $('form').submit(function(event){
        event.preventDefault()

        var search = $("#search").val()

        channelSearch(search,5)
    })

    function channelSearch(search,maxResults) {
        fetch("https://api.subscriberwars.space/youtube/channel-search/" + maxResults + "/" + search).then(res => res.json()).then(data => {
           console.log(data)

           img1.src = data.items[0].snippet.thumbnails.high.url
           nam1.innerHTML = data.items[0].snippet.channelTitle
           id1.innerHTML = data.items[0].id.channelId
           link1.href = "https://subscriberwars.space/youtube/mixerno?u="+data.items[0].id.channelId

           img2.src = data.items[1].snippet.thumbnails.high.url
           nam2.innerHTML = data.items[1].snippet.channelTitle
           id2.innerHTML = data.items[1].id.channelId
           link2.href = "https://subscriberwars.space/youtube/mixerno?u="+data.items[1].id.channelId

           img3.src = data.items[2].snippet.thumbnails.high.url
           nam3.innerHTML = data.items[2].snippet.channelTitle
           id3.innerHTML = data.items[2].id.channelId
           link3.href = "https://subscriberwars.space/youtube/mixerno?u="+data.items[2].id.channelId

           img4.src = data.items[3].snippet.thumbnails.high.url
           nam4.innerHTML = data.items[3].snippet.channelTitle
           id4.innerHTML = data.items[3].id.channelId
           link4.href = "https://subscriberwars.space/youtube/mixerno?u="+data.items[3].id.channelId

           img5.src = data.items[4].snippet.thumbnails.high.url
           nam5.innerHTML = data.items[4].snippet.channelTitle
           id5.innerHTML = data.items[4].id.channelId
           link5.href = "https://subscriberwars.space/youtube/mixerno?u="+data.items[4].id.channelId
        })
    }
})