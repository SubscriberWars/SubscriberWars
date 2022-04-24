$(document).ready(function(){

    $('form').submit(function(event){
        event.preventDefault()

        var search = $("#search").val()

        channelSearch(search)
    })

    function channelSearch(search) {
        fetch("https://api.subscriberwars.space/twitch/search/" + search).then(res => res.json()).then(data => {
           console.log(data)

           img1.src = data.data[0].thumbnail_url
           nam1.innerHTML = data.data[0].display_name
           id1.innerHTML = data.data[0].id
           link1.href = "https://subscriberwars.space/twitch?u="+data.data[0].broadcaster_login

           img2.src = data.data[1].thumbnail_url
           nam2.innerHTML = data.data[1].display_name
           id2.innerHTML = data.data[1].id
           link2.href = "https://subscriberwars.space/twitch?u="+data.data[1].broadcaster_login

           img3.src = data.data[2].thumbnail_url
           nam3.innerHTML = data.data[2].display_name
           id3.innerHTML = data.data[2].id
           link3.href = "https://subscriberwars.space/twitch?u="+data.data[2].broadcaster_login

           img4.src = data.data[3].thumbnail_url
           nam4.innerHTML = data.data[3].display_name
           id4.innerHTML = data.data[3].id
           link4.href = "https://subscriberwars.space/twitch?u="+data.data[3].broadcaster_login

           img5.src = data.data[4].thumbnail_url
           nam5.innerHTML = data.data[4].display_name
           id5.innerHTML = data.data[4].id
           link5.href = "https://subscriberwars.space/twitch?u="+data.data[4].broadcaster_login
        })
    }
})