const mongoose = require('mongoose')

const User = new mongoose.Schema({
    username: { type : String , lowercase : true , unique: true ,  required: true, minlength: 3, maxlength: 20},
    name: {type:String, required:true, trim:true, default:''},
    email: {type:String, required:true, trim:true, default:''},
    contact: {type:Number, default:0},
    password: {type:String, required:true, trim:true, default:''},
    birthdayDate: {type:Date, default:''} //formatar data
})

module.exports = mongoose.model('User', User)