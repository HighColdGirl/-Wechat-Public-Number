/*构建一个回复对象*/

function buildReplyObj(userInput) {
    let obj= {}
    //相同处理
    obj.ToUserName = userInput.FromUserName,
    obj.FromUserName = userInput.ToUserName
    obj.CreateTime = Date.now()

    if(userInput.Content === '你好啊'){
      obj.MsgType = 'text',
      obj.Content = '都挺好的'
      return obj
    }

    else if(userInput.MsgType === 'image'){
      obj.MsgType = 'image',
      obj.MediaId = userInput.MediaId
      return obj
    }

    else{
      obj.MsgType = 'text',
      obj.Content = '你说什么，我听不懂'
      return obj
    }
}

module.exports = buildReplyObj