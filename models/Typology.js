const mongoose = require('mongoose')

const Typology = new mongoose.Schema({
    idTypology: {type:Number, required: true},
    typologyName: {type:String, required: true},
})

module.exports = mongoose.model('Typology', Typology)

