const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')

Router.get('/info', async (req, res) => {
    return res.json({ code: 200 })
})

Router.get('/list', async (req, res) => {
    User.find({}, async (err, doc) => {
        return res.json(doc)
    })
})

Router.post('/register', async (req, res) => {
    const { user, pwd, type } = req.body.data

    User.findOne({ user }, async (err, doc) => {
        if (doc) {
            return res.json({ code: -1, msg: '用户名重复' })
        }

        User.create({ user, pwd, type }, async (err, doc) => {
            if (e) {
                return res.json({ code: -1, msg: '后端出错了' })
            }
            return res, json({ code: 200, msg: '注册成功!'})
        })
    })
})

module.exports = Router