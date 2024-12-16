const sql = require('mysql2')

const connection = sql.createConnection({
    host : "localhost",
    user : "root",
    password : 'peace',
    database : 'demo'
});

connection.connect((err)=>{
    if(err){
        console.error("Error on connecting the sql : ",err.message);
        return;
    }
    console.log('connected to mysql database!');
});

module.exports = connection;
