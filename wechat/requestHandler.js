//响应微信服务器验证
/*
 1.在验证服务器有效性时，微信服务器会给开发者服务器发送内容：
 {signature: '微信服务器经过特殊加密之后的字符串',
 echostr: '微信服务器给开发者的一个随机字符串',
 timestamp: '时间戳',
 nonce: '随机的数字'}
 2.开发者发给服务器严格检验结果确定互相认识：
 1.将微信返回的timestamp、nonce、Token拼成一个数组，进行字典排序.sort()
 2.将字典排序后的数组，拼成一个字符串join().toString()，并对该字符串进行sha1加密
 3.将加密后的字符串和signature进行对比
 --相同，返回echostr给微信服务器
 --不相等，驳回请求
 */

//引入config,sha1
let config = require('../config/config')
let sha1 = require('sha1')

//引入处理数据逻辑
let {getXMLData,parseXml,formatjsData} = require('../tools/parseData')

//引入回复对象和处理函数
let buildReplyObj = require('../reply/replyObj')
let buildReplyXML = require('../reply/replyXML')

module.exports = ()=>{
    return async(req,res,next)=>{
        //解构赋值
        let {signature,echostr,timestamp,nonce} = req.query
        let {Token} = config
        //定义数组join拼接，tostring变字符串加密
        //let arr =[timestamp,nonce,Token]
        //let str = sha1(arr.join('').toString())
        let sh1str = sha1([timestamp,nonce,Token].sort().join('').toString())

        //微信服务器发来的是验证开发者服务器的GET请求
        if(req.method === 'GET' && sh1str === signature){
            console.log('微信服务器发来了验证请求')
            res.send(echostr)
        }

        //微信服务器发来的是普通消息
        else if(req.method === 'POST' && sh1str === signature ){
            /*
             <xml>
             <ToUserName><![CDATA[给谁的]]></ToUserName>
             <FromUserName><![CDATA[来自谁]]></FromUserName>
             <CreateTime>时间戳</CreateTime>
             <MsgType><![CDATA[信息类型]]></MsgType>
             <Content><![CDATA[[输入的文字]]]></Content>
             <MsgId>微信服务器分配唯一标识</MsgId>
             </xml>
             */
            //XML解析
            let xmlData = await getXMLData(req)
            //解析数据处理
            let jsData = parseXml(xmlData)
            //用户处理
            let userInput = formatjsData(jsData)
            console.log(userInput);
            //加工成了一个回复对象（不能直接发给微信服务器）
            let replyObj = buildReplyObj(userInput)
            //构建成真正的xml数据
            let finalXmlData = buildReplyXML(replyObj)
            console.log(finalXmlData);
            res.send(finalXmlData)
        }
        //服务器连接失败
        else{
            res.send('禁止非法访问')
        }
    }
}