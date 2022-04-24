$(document).ready(function(){

    $('form').submit(function(event){
        event.preventDefault()

        var search = $("#search").val()

        channelSearch(search,5)
    })

    function channelSearch(search,maxResults) {
        fetch("https://api.subscriberwars.space/youtube/video-search/" + maxResults + "/" + search).then(res => res.json()).then(data => {
           console.log(data)

           img1.src = data.items[0].snippet.thumbnails.high.url
           nam1.innerHTML = data.items[0].snippet.title
           id1.innerHTML = data.items[0].id.videoId
           link1.href = "https://subscriberwars.space/youtube/video?v="+data.items[0].id.videoId

           img2.src = data.items[1].snippet.thumbnails.high.url
           nam2.innerHTML = data.items[1].snippet.title
           id2.innerHTML = data.items[1].id.videoId
           link2.href = "https://subscriberwars.space/youtube/video?v="+data.items[1].id.videoId

           img3.src = data.items[2].snippet.thumbnails.high.url
           nam3.innerHTML = data.items[2].snippet.title
           id3.innerHTML = data.items[2].id.videoId
           link3.href = "https://subscriberwars.space/youtube/video?v="+data.items[2].id.videoId

           img4.src = data.items[3].snippet.thumbnails.high.url
           nam4.innerHTML = data.items[3].snippet.title
           id4.innerHTML = data.items[3].id.videoId
           link4.href = "https://subscriberwars.space/youtube/video?v="+data.items[3].id.videoId

           img5.src = data.items[4].snippet.thumbnails.high.url
           nam5.innerHTML = data.items[4].snippet.title
           id5.innerHTML = data.items[4].id.videoId
           link5.href = "https://subscriberwars.space/youtube/video?v="+data.items[4].id.videoId
        })
    }
})