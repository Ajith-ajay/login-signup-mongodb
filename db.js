const mongoose = require('mongoose');

async function createDatabase() {
    mongoose.connect('mongodb://localhost:27017/show')
    .then(()=>{
        console.log('Connected to MongoDB');
    }).catch(()=>{
        console.log('Error connecting to MongoDB');
    })
} 

module.exports = {
    createDatabase
}