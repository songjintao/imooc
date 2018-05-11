const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const utils = require('utility')

const _filter = {__v: 0}

Router.get('/info', async (req, res) => {
    const {userid} = req.cookies
    if(!userid) {
        return res.json({code: -1})
    }
    User.findOne({_id: userid }, _filter, async (err,doc)=> {
        if(err) {
            return res.json({code: -1, msg: '后端错误'})
        }
        if(doc) {
            doc['pwd'] = ''
            return res.json({code: 200, data: doc})
        }
    })
})

Router.get('/list', async (req, res) => {
    User.find({}, async (err, doc) => {
        return res.json(doc)
    })
})

Router.get('/remove', async (req, res)=> {
    User.remove({}, async (err, doc)=> {
        if(doc){
            res.json(doc)
        }
    })
})

Router.post('/register', async (req, res) => {
    console.log(req.body)
    const { user, pwd, type } = req.body

    User.findOne({ user }, async (err, doc) => {
        if (doc) {
            return res.json({ code: -1, msg: '用户名重复' })
        }

        User.create({ user, type, pwd: utils.md5(pwd) }, async (err, doc) => {
            if (err) {
                return res.json({ code: -1, msg: '后端出错了' })
            }
            return res.json({ code: 200, msg: '注册成功!'})
        })
    })
})

Router.post('/login', async (req, res) => {
    const { user, pwd } = req.body
    User.findOne({ user }, _filter, async (err, doc) => {
        if (doc) {
            if(utils.md5(pwd) === doc.pwd){
                doc['pwd'] = ''
                res.cookie('userid', doc._id)
                return res.json({ code: 200, msg: '登陆成功', data: doc })
            }else {
                return res.json({ code: -1, msg: '密码不正确' })
            }
        }else {
            return res.json({ code: -1, msg: '用户名不存在' })
        }
    })
})

module.exports = Router