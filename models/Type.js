const mongoose = require('mongoose')

const Type = mongoose.model('Type', {
    idType: {type:String, required: true},
    typeName: {type:Number, default:0, required: true},
})

module.exports = mongoose.model('Type', Type)

