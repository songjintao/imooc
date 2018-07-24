const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const utils = require('utility')

const _filter = { __v: 0, pwd: 0 }

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
    const {type} = req.query

    User.find({type}, async (err, doc) => {
        if(err) {
            throw err
        }
        if(doc) {
            return res.json({code: 200, msg:'', data: doc})
        }
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
    const { user, pwd, type } = req.body

    User.findOne({ user }, async (err, doc) => {
        if (doc) {
            return res.json({ code: -1, msg: '用户名重复' })
        }

        // User.create({ user, type, pwd: utils.md5(pwd) }, async (e, doc) => {
        //     if (e) {
        //         return res.json({ code: -1, msg: '后端出错了' })
        //     }
        //     return res.json({ code: 200, msg: '注册成功!', data: doc})
        // })

        const userModel = new User({user, type, pwd: utils.md5(pwd)})

        userModel.save(async (e, d)=> {
            if(e) {
                return res.json({ code: -1, msg: '后端出错了' })
            }
            const { user, type, _id } = d
            res.cookie('userid', _id)
            return res.json({ code: 200, msg: '注册成功!', data: { user, type, _id }})
        })
    })
})

Router.post('/login', async (req, res) => {
    const { user, pwd } = req.body
    User.findOne({ user }, async (err, doc) => {
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


Router.post('/update', async (req,res)=>{
    const userid = req.cookies.userid
    if(!userid) {
        return res.json({code: -1})
    }
    const body = req.body
    User.findByIdAndUpdate(userid, body, async (err, doc)=> {
        // const { user, type } = body
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body)
        return res.json({code: 200, data: data })
    })

})

module.exports = Router