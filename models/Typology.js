const mongoose = require('mongoose')

const Typology = mongoose.model('Typology', {
    idType: {type:String, required: true},
    typeName: {type:Number, default:0, required: true},
})

module.exports = mongoose.model('Typology', Typology)

