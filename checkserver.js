/*
微信公众号服务器
*/

//引入express实例，sha1加密
let express = require('express')
let app = express()
let sha1 = require('sha1')

//引入请求逻辑
let requestHandler = require('./wechat/requestHandler')

//处理post请求编码
app.use(express.urlencoded({extended:true}))

//响应微信服务器验证
app.use(requestHandler())

//服务器监听
app.listen('3000',(err)=>{
    if(!err){
        console.log('服务器启动成功');
    }else{
        console.log(err);
    }
})