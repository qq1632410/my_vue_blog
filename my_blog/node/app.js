const express = require("express")
const router =require('./router.js')


const app=new express();
app.use(router)

app.listen("3000",(err)=>{
  if(err){
    console.log("err");
  }
  else{
    console.log("running")
  }
})