const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

//创建app
const app = express()

app.use(cookieParser())
app.use(bodyParser.json())

const userRouter = require('./user')
app.use('/user', userRouter)

// 运行
let server = app.listen(9093, async (req, res) => {
    console.log(`Node 已运行在 ${server.address().address}${server.address().port} 端口`)
})
