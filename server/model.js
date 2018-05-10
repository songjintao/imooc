const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017/imooc'

mongoose.connect(DB_URL)

mongoose.connection.on('connected', async () => {
    console.info('mongo 连接成功')
})

const models = {
    user: {
        user: { type: String, require: true },
        pwd: { type: String, require: true },
        type: { type: String, require: true },

        avatar: { type: String},
        desc: { type: String },//简介
        title: { type: String },//职位名
        company: { type: String },
        money: { type: String }
    },
    chat: {

    }
}

for(let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function(name) {
        return mongoose.model(name)
    }
}


