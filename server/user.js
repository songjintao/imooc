const express = require('express')
const Router = express.Router()

Router.get('/info', async (req, res)=> {
    return res.json({code: 200})
})

module.exports = Router