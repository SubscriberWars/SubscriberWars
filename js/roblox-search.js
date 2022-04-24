$(document).ready(function(){

    $('form').submit(function(event){
        event.preventDefault()

        var search = $("#search").val()

        channelSearch(search)
    })

    function channelSearch(search) {
        fetch("https://api.subscriberwars.space/roblox/search/" + search).then(res => res.json()).then(data => {
           console.log(data)

           nam1.innerHTML = "@"+ data.data[0].name
           disnam1.innerHTML = data.data[0].displayName
           id1.innerHTML = data.data[0].id
           link1.href = "https://subscriberwars.space/roblox?u="+data.data[0].id

           nam2.innerHTML = "@"+ data.data[1].name
           disnam2.innerHTML = data.data[1].displayName
           id2.innerHTML = data.data[1].id
           link2.href = "https://subscriberwars.space/roblox?u="+data.data[1].id

           nam3.innerHTML = "@"+ data.data[2].name
           disnam3.innerHTML = data.data[2].displayName
           id3.innerHTML = data.data[2].id
           link3.href = "https://subscriberwars.space/roblox?u="+data.data[2].id

           nam4.innerHTML = "@"+ data.data[3].name
           disnam4.innerHTML = data.data[3].displayName
           id4.innerHTML = data.data[3].id
           link4.href = "https://subscriberwars.space/roblox?u="+data.data[3].id

           nam5.innerHTML = "@"+ data.data[4].name
           disnam5.innerHTML = data.data[4].displayName
           id5.innerHTML = data.data[4].id
           link5.href = "https://subscriberwars.space/roblox?u="+data.data[4].id
        })

    }

})