const express = require('express');
const sql = require('./database');          //importing the database connections
const app = express.Router();               //saying the file to express as route file

app.get('/',(req,res,next)=>{               //Staring the web page from the root(index) file 
    res.render('index');
});

app.get('/login',(req,res,next)=>{          //redirecting to the login page
    res.render('login',{
        msg : null
    });
});

app.post('/login',(req,res,next)=>{         //handling the login page in post method(when the inputs are send)
    const {email,password} = req.body;
    sql.query('select * from admin1 where email=?',[email],(err,result)=>{          //checking the email in database 
        if(err){
            console.error("Error executing query ",err.message);
            return;
        }
        if (result.length === 0) {          //founding the match (length == 0 no match)
            // console.log("No match found");  
            res.render('sign-up',{
                error : true,
                msg : 'Create a new account'
            });
        } else {
            // console.log(result);
            const hashedPassword = result[0].pass;
            if (password === hashedPassword) {
                res.render('profile',{
                    msg : null,
                    name : result[0].name,
                    mail : result[0].email,
                    phone : result[0].phone
                });
            } else {
                res.render('login',{
                    msg : 'Invalid password'
                })
            }
        }
    })
})

app.get('/sign-up',(req,res,next)=>{
    res.render('sign-up',{
        msg : null
    });
});

app.post('/sign-up',(req,res,next)=>{
    const {name,ph,email,password,re_password} = req.body;
    sql.query('select * from admin1 where email=?',[email],(err,result)=>{
        if(err) {
            console.error("Error executing query ",err.message);
            return;
        }
        if (result.length === 0) {
            if (password === re_password) {
                sql.query('insert into admin1 (name, email, pass, phone) values (?, ?, ?, ?)',[name, email, password, ph],(err,result)=>{
                    if (err) {
                        console.error("Error executing query ",err.message);
                        return;
                    } else {
                        res.render('login',{
                            msg : 'Account Created Successfully Log in to your account'
                        });
                    }
                });
            } else {
                res.render('sign-up',{
                    msg : "re-enter your password correctly"
                });
            }   
        } else {
            res.render('login',{
                msg : 'Email already exists'
            })
        }
    });
});

module.exports = app;