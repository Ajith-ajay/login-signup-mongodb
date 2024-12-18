const express = require('express');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const app = express.Router();          

app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/login',(req,res)=>{
    res.render('login',{
        msg: null
    });
});

app.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    try {
        const result = await userModel.findOne({email:email});
        if (result) {
            const pass = await bcrypt.compare(password,result.password);
            if (pass) {
                res.render('profile',{
                    name:result.name,
                    email:result.email,
                    phone:result.phone
                });
            } else {
                res.render('login',{
                    msg:'incorrect password'
                });
            }
        } else {
            res.render('sign-up',{
                msg:'Account does not exist create new one'
            })
        }
    } catch (error) {
        console.log('Error',error);
    }
})

app.get('/sign-up',(req,res)=>{
    res.render('sign-up',{
        msg: null
    });
});

app.post('/sign-up',async (req,res)=>{
    const {name,email,password,ph,re_password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    try {
        const result = await userModel.findOne({email:email});
        if (!result) {
            if (password === re_password) {
                const userDetail = new userModel({email:email, name:name, password:hashedPassword, phone:ph});
                userDetail.save();
                return res.render('login',{
                    msg: 'Account created successfully...Login to continue'
                });
            } else {
                res.render('sign-up',{
                    msg: 'Password and re-password do not match'
                })
            }
        } else {
            res.render('login',{
                msg: 'Account already exists'
            });
        }
    } catch (error) {
        console.log('Error',error);
    }
})

module.exports = app;