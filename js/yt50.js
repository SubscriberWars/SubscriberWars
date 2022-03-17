var c = 1;
var lol = []

for (var l = 1; l <= 5; l++) {
  var htmlrow = `<div class="row_${l} row"></div>`;
  $('.counters').append(htmlrow);
    for (var t = 1; t <= 10; t++) {
      let number;
      if(c.toString().length == 1) {
          number = `<div class="cnb">0${c}</div>`
      } else {
            number = `<div class="cnb">${c}</div>`
      }

      var htmlcard = `<div class="channel_${c} card" id="card_thing_${c}">
      ${number}
      <img src="https://subscriberwars.space/logo/Subscriber%20Wars.png" alt="" class="cimg">
      <div class="chnam">Loading</div>
      <div class="subscriberCount odometer">0</div>
      </div>`;
      $('.row_'+l).append(htmlcard);
      c += 1;
    }
}

function random(min, max){
  return Math.floor(Math.random()* (max-min) + min);
}

function updateData(q, data) {
  setTimeout(function () { 
    var cnb = q+1;


    $(".channel_"+cnb+" .cimg").attr("src",data.channel[q].pfp);
    $(".channel_"+cnb+" .chnam").html(data.channel[q].name);
    $(".channel_"+cnb+" .subscriberCount").html(Math.floor(data.channel[q].subscriberCount));


    if (lol[q] - data.channel[q].subscriberCount >= 1) {
      document.getElementById("card_thing_"+cnb+"").style.backgroundColor = "#282828";
      setTimeout(reset, 500)
    }
    if (lol[q] - data.channel[q].subscriberCount <= -1) {
      document.getElementById("card_thing_"+cnb+"").style.backgroundColor = "#282828";
      setTimeout(reset, 500)
    }

    setTimeout(idkpopdelay, 1000) 

    function idkpopdelay() {
      lol[q] = data.channel[q].subscriberCount
    }

function reset() {
  document.getElementById("card_thing_"+cnb+"").style.backgroundColor = "#0f0f0f";
}


    }, random(5 , 25)*1000);
}

function update(){
    $.getJSON("https://top50.subscriberwars.repl.co/top50",(data)=>{

        data.channel.sort(function(a,b){return b.subscriberCount - a.subscriberCount});

        for (var q = 0; q < 50; q++) {
          updateData(q, data)
        }
    });
}


update();
setInterval(update,5000);
setTimeout(function(){$('.loader').fadeOut(); $('.counters').fadeIn(1000);},1000)
setTimeout(function(){$('#loading').fadeOut(); $('.counters').fadeIn(1000);},1000)
