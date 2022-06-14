const mongoose = require('mongoose')

const Type = new mongoose.Schema({
    idType: {type:Number, required: true},
    typeName: {type:String, required: true},
})

module.exports = mongoose.model('Type', Type)

