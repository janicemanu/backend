const router= require('express').Router()
const bycrypt= require('bcryptjs')
const isEmail = require('validator/lib/isEmail')

const multer=require('multer')
const conn= require('../connection/connection')
const sendVerify = require('../emails/nodemailers')


router.post('/users',async(req,res)=>{
    var sql1='SELECT * FROM customers'
    var sql2='INSERT INTO customers SET ?'
    var data = req.body
     
    if(!isEmail(req.body.email))return res.send('email is not valid')

    req.body.password =await bycrypt.hash(req.body.password,8)

    conn.query(sql2,data,(err,results)=>{
        if(err)return res.send(err)

        // sendVerify(req.body.username, req.body.email)

        conn.query(sql1,(err,result)=>{
            if(err) throw err

            res.send(result)


        })


    })





})


module.exports = router