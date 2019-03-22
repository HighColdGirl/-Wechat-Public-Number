/*根据回复对象,构建一个XML字符串（发给微服务器的）*/

function buildReplyXML(replyObj) {
  //相同部分拼接
  let XML = `<xml>
            <ToUserName><![CDATA[${replyObj.ToUserName}]]></ToUserName>
            <FromUserName><![CDATA[${replyObj.FromUserName}]]></FromUserName>
            <CreateTime>${Date.now()}</CreateTime>`
//判定类型返参（被动回复6种类型）
  if(replyObj.MsgType === 'text'){
          XML += `
            <MsgType><![CDATA[text]]></MsgType>
            <Content><![CDATA[${replyObj.Content}]]></Content>`
  }

  else if(replyObj.MsgType === 'image'){
    XML += `
            <MsgType><![CDATA[image]]></MsgType>
          <Image>
            <MediaId><![CDATA[${replyObj.MediaId}]]></MediaId>
          </Image>`
  }
  XML += `</xml>`

  return XML

}
module.exports = buildReplyXML