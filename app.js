const express = require("express");           
const hbs = require("express-handlebars");      
const admin = require('./routes/admin');         
const body = require('body-parser');    
const db = require('./db');
db.createDatabase();       
const app = express();

app.use(express.static('public'));             
app.use(body.urlencoded({extended : true}));    
app.engine('hbs',hbs.engine({extname : '.hbs',defaultLayout : false}));   
app.set('view engine', 'hbs');
app.use(admin);                               

app.listen(8080,()=>{                         
    console.log("Server running on http://localhost:8080/");
});