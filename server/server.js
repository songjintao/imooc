const express = require('express')
const mongoose = require('mongoose')

//创建app
const app = express()

// 链接mongo->使用imooc集合
const DB_URL = 'mongodb://localhost:27017/imooc'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', async () => {
    console.log('mongo 连接成功')
})

// 类似于mysql的表 mongo里面有文档 字段的概念
const User = mongoose.model('user', new mongoose.Schema({
    // trpe-> 数据类型  require->是否必填
    name: { type: String, require: true },
    age: { type: Number, require: true }
}))



app.get('/', async (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/add', async (req, res) => {
    User.create({
        name: 'sjt',
        age: 22
    }, async (err, doc) => {
        if (!err) {
            res.json(doc)
        } else {
            console.log(err)
        }
    })
})

app.get('/find', async (req, res) => {
    User.find({}, async (err, doc) => {
        if (!err) {
            res.json(doc)
        } else {
            console.log(err)
        }
    })
})

app.get("/update", (req, res) => {
    // 将{ "name": "sjt" } 的age更新为{ age: 18 }
    User.update({ "name": "sjt" }, { "$set": { age: 18 } }, async (err, doc) => {
        if (!err) {
            res.json(doc)
        } else {
            console.log(err)
        }
    })
})

app.get("/remove", (req, res) => {
    // 将{ "name": "sjt" } 的age更新为{ age: 18 }
    User.remove({age:18}, async (err, doc) => {
        if (!err) {
            res.json(doc)
        } else {
            console.log(err)
        }
    })
})

// 运行
let server = app.listen(9093, async (req, res) => {
    console.log(`Node 已运行在 ${server.address().address}${server.address().port} 端口`)
})
