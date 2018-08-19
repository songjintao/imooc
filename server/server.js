const express = require('express')
//创建app
const app = express()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const server = require('http').Server(app)
const io = require('socket.io')(server)

const model = require('./model')
// const User = model.getModel('user')
const Chat = model.getModel('chat')

app.use(cookieParser())
app.use(bodyParser.json())

const userRouter = require('./user')
app.use('/user', userRouter)

io.on('connection', (socket)=> {
    socket.on('sendmsg', (data)=> {
        // console.log(data)
        const { from, to, msg } = data
        const chatid = [from, to].sort().join('_')
        Chat.create({chatid, from, to, content: msg}, (err, doc)=> {
            if(!err) {
                io.emit('recvmsg', Object.assign({}, doc._doc))
            }
        })
    })
})

// 运行
let server_info = server.listen(9093, async (req, res) => {
    console.log(`Node 已运行在 ${server_info.address().address}${server_info.address().port} 端口`)
})
