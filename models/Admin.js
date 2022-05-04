const mongoose = require('mongoose')

const Admin = new mongoose.Schema({
    username: { type : String , lowercase : true , unique: true ,  required: true, minlength: 3, maxlength: 20},
    name: {type:String, required:true, trim:true, default:''},
    email: {type:String, required:true, trim:true, default:''},
    password: {type:String, required:true, trim:true, default:''}
})

module.exports = mongoose.model('Admin', Admin)