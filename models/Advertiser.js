const mongoose = require('mongoose')

const Advertiser = new mongoose.Schema({
    username: { type : String , lowercase : true , unique: true ,  required: true, minlength: 3, maxlength: 20},
    name: {type:String, required:true, trim:true, default:''},
    email: {type:String, required:true, trim:true, default:''},
    contact: {type:Number, default:0},
    password: {type:String, required:true, trim:true, default:''},
    birthdayDate: {type:Date, default:''}
})

module.exports = mongoose.model('Advertiser', Advertiser)