const https = require("https")
const express = require("express")
const app = express()
const PORT = process.env.PORT || 5500 //
const TOKEN = 'U9Zbez22zmgtvyj1y8AwjqQ1TzXQZFdhISUWZ7QwR18iVRJVV/MYknFCEbnC7uI/blfRJZN/MqwDf+1hw5sKYAsc8STBsxz4C3xtQKEqh2hQweLg6qHlj7AC+s0RxxzeHuloU7xQjhlW8dFt1jJiyQdB04t89/1O/w1cDnyilFU='
// import 
import {text_from_html} from './script.js';

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.get("/", (req, res) => {
  res.send('สวัสดี express')
})

app.post("/webhook", (req, res) => {
    console.log('req.body =>', JSON.stringify(req.body,null, 2)) // สิ่งที่ไลน์ส่งมา
    res.send("HTTP POST request sent to the webhook URL!")

    // set to send message back 
    if (req.body.events[0].type === "message"){
        // Message data, must be stringified
        const dataString = JSON.stringify({
            replyToken: req.body.events[0].replyToken, // String ที่ user ส่งข้อความหาบอทเรา ใช้ในการตอบกลับช่วงระยะเวลาหนึ่งเท่านั้น ใช้ได้ครั้งเดียว
            messages:[                                 // messages คือ Array ของ Message Object จะเเป็น content ได้ทั้ง ข้อความ รูป วิดีโอ เสียง sticker อื่นๆ 
            {   "type": "text",
                "text": "Hello, user May I help you?"
            },
            {
                "type": "text",
                "text": text_from_html
            }
          ]
        })

        // Request header
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + TOKEN
        }

        // Option to pass into the request
        const webhookOptions = {
            "hostname": "api.line.me",
            "path":  "/v2/bot/message/reply",
            "method": "POST",
            "headers": headers,
            "body": dataString
        }

        // Define request 
        const request = https.request(webhookOptions, (res) =>{
            res.on("data", (d) => {
                process.stdout.write(d)
            })     
        })

        // Handle error
        request.on("error", (err) => {
        console.error(err)
      })
  
        // Send data
        request.write(dataString)
        request.end()

    }
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
