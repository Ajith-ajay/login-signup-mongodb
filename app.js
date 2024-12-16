const express = require("express");             //for using the express.js framework 
const hbs = require("express-handlebars");      //for view engine
const admin = require('./routes/admin');        //routes 
const body = require('body-parser');            //changing the data format from the web page
const app = express();

app.use(express.static('public'));              //declaring the static folder to use css for the web page
app.use(body.urlencoded({extended : true}));    //using the body parser
app.engine('hbs',hbs.engine({extname : '.hbs',defaultLayout : false}));     //setting the handlebars view engine
app.set('view engine', 'hbs');
app.use(admin);                                 //say the framework to use the route files

app.listen(8080,()=>{                           //starting the port at 8080(choose any number)
    console.log("Server running on http://localhost:8080/");
});