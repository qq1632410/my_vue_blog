const express=require("express")
const fs = require("fs")
const router=express.Router();

router.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})

router.get("/data",(erq,res)=>{
  fs.readFile("./info.json",(err,data)=>{
      if(err){
        console.log("读取文件失败")
        res.send("服务器繁忙")
      }
      else{
        // console.log(data)
        let x=JSON.parse(data)
        // console.log("x",x);
        res.send(x)
      }
  })
})

router.get("/login",(req,res)=>{
  fs.readFile("./admin.json",(err,data)=>{
      if(err){
        console.log("读取文件失败")
        res.send("服务器繁忙")
      }
      else{
        let result=JSON.parse(data);
        let has=result.some((item)=>{
          return (item.name==req.query.name)&&(item.password==req.query.password)
        })
        if(has){
          res.send(true)
        }
        else{
          res.send(false)
        }
      }
  })
})

router.get('/regest',(req,res)=>{
  fs.readFile("./admin.json",(err,data)=>{
      if(err){
        console.log("读取文件失败")
        res.send("服务器繁忙")
      }
      else{
        let result=JSON.parse(data);
        let has=result.some((item)=>{
          return (item.name==req.query.name)
        })
        if(has){
          res.send(false)
        }
        else{
          result.push(req.query)
          result=JSON.stringify(result)
          fs.writeFile('./admin.json',result,(err)=>{
            if(err){
              res.send("注册失败，稍后再试")
            }
          })
          res.send(true)
        }
      }
  })
})

router.get('/save',(req,res)=>{
fs.writeFile('./info.json',JSON.stringify(req.query.info),(err)=>{
  if(err){
    res.send("写入失败");
  }
  else{
    res.send("写入成功")
  }
})
})

module.exports=router