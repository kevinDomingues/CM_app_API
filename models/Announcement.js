const mongoose = require('mongoose')

const Announcement = new mongoose.Schema({
    idUser: {type:String, required: true},
    type: {type:Number, default:0, required: true},
    typology: {type:Number, default:0, required: true},
    netArea: {type:Number, default:0, required: true},
    bathrooms: {type:Number, default:0, required: true},
    price: {type:Number, default:0, required: true},
    location: {type:String, required: true},
    constructionYear: {type:Number, default:0, required: true},
    hourDate: {type:Date, default: Date.now},
    images: {type: String}
})

module.exports = mongoose.model('Announcement', Announcement)

