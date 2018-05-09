const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017/imooc'

mongoose.connect(DB_URL)
mongoose.connection.on('connected', async () => {
    console.log('mongo 连接成功')
})