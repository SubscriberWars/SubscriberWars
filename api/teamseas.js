const express=require('express'),
app=express(),
fetch=require('node-fetch');
const path=require('path')

app.get('/api/teamseas',(req,resp)=>{
  resp.setHeader('Access-Control-Allow-Origin','https://subscriberwars.space');
  fetch("https://tscache.com/donation_total.json")

  .then(res=>res.json()).then(data=>{
    resp.json({
      count:(data.count),
    })
  })
})
