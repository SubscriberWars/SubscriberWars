$(document).ready(function(){

    $('form').submit(function(event){
        event.preventDefault()

        var search = $("#search").val()

        channelSearch(search)
    })

    function channelSearch(search) {
        fetch("https://api.subscriberwars.space/twitter/user-search/5/" + search).then(res => res.json()).then(data => {
           console.log(data)

           img1.src = data[0].profile_image_url_https.replace("normal.jpg","400x400.jpg")
           nam1.innerHTML = data[0].name
           id1.innerHTML = "@"+data[0].screen_name
           link1.href = "https://subscriberwars.space/twitter?u="+data[0].screen_name

           img2.src = data[1].profile_image_url_https.replace("normal.jpg","400x400.jpg")
           nam2.innerHTML = data[1].name
           id2.innerHTML = "@"+data[1].screen_name
           link2.href = "https://subscriberwars.space/twitter?u="+data[1].screen_name

           img3.src = data[2].profile_image_url_https.replace("normal.jpg","400x400.jpg")
           nam3.innerHTML = data[2].name
           id3.innerHTML = "@"+data[2].screen_name
           link3.href = "https://subscriberwars.space/twitter?u="+data[2].screen_name

           img4.src = data[3].profile_image_url_https.replace("normal.jpg","400x400.jpg")
           nam4.innerHTML = data[3].name
           id4.innerHTML = "@"+data[3].screen_name
           link4.href = "https://subscriberwars.space/twitter?u="+data[3].screen_name

           img5.src = data[4].profile_image_url_https.replace("normal.jpg","400x400.jpg")
           nam5.innerHTML = data[4].name
           id5.innerHTML = "@"+data[4].screen_name
           link5.href = "https://subscriberwars.space/twitter?u="+data[4].screen_name
        })
    }
})