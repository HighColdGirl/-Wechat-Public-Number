/*数据处理逻辑*/
//xml解析库将XML转成js代码
let {parseString} = require('xml2js')

module.exports = {
    //获取微信服务器发送过来的xml格式数据
    getXMLData(req) {
        //处理返回值为空的异步
        return new Promise((resolve,reject)=>{
            //流式文件读取返回Buffer
            req.on('data',(data)=>{
                //给参为转为字符串
                resolve(data.toString())
            })
        })
    },
    //将xml格式的数据，转换成js数据
    parseXml(xmlData) {
        //接参为对象
        let result = null
        //转换去空格
        parseString(xmlData,{trim:true},(err,data)=>{
            if(!err){
                result = data
            }else{
                console.log('转换xml数据为js数据时出错，',err)
                result = 'err'
            }
        })
        return result
    },
    //格式化js数据
    formatjsData({xml}) {
        /*
         {ToUserName: [ '给谁的' ],
         FromUserName: [ '来自谁加密' ],
         CreateTime: [ '时间戳' ],
         MsgType: [ '类型' ],
         Content: [ '具体内容' ],
         MsgId: [ '唯一的' ]}
         */
        let result = {}
        //加工的逻辑
        for (let key in xml){
            //console.log(key)
            let value = xml[key][0]
            result[key] = value
        }
        return result
    }
}
