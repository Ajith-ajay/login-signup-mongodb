const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    name:{type:String, required:true},
    phone:{type:String, required:true} ,   
},{
    collection: 'user_detail'
})

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;