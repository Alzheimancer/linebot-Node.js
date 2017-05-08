var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()

app.set('port', (process.env.PORT || 4000))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.post('/webhook', (req, res) => {
  var text = req.body.events[0].message.text
  var sender = req.body.events[0].source.userId
  var replyToken = req.body.events[0].replyToken
  console.log(text, sender, replyToken)
  console.log(typeof sender, typeof text)
  // console.log(req.body.events[0])
  if (text === 'สวัสดี' || text === 'Hello' || text === 'hello') {
    sendText(sender, replyToken, text )
  }
  res.sendStatus(200)
})

function sendText (sender, replyToken, text) {
  let data = {
    to: sender,
    replyToken: replyToken,
    messages: [
      {
        type: 'text',
        text: 'สวัสดีค่ะ เราชื่อ Mink ยินดีที่ได้รู้จัก 🤖'
      }
    ]
  }
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer DbyRCCbfACI2HkGCppFNVRPEuyhtxddgHtC8oJxiddXyfouVzQ1IHU8EKSp1im/xEUxHhmb/wEw+cGYqvCucVUhRmsOQj7tjo1eSZNzYYMzCr6e7/6Y0AKyx5A9gXOtiK0AgfOD6WMMmNi4yjp+11QdB04t89/1O/w1cDnyilFU='
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err) console.log('error')
    if (res) console.log('success')
    if (body) console.log(body)
  })
}

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})
