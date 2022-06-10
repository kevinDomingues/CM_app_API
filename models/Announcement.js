const mongoose = require('mongoose')

const Announcement = new mongoose.Schema({
    idUser: {type:String, required: true},
    name: {type:String, required: true},
    type: {type:Number, default:0, required: true},
    rooms: {type:Number, default:0, required: true},
    netArea: {type:Number, default:0, required: true},
    bathrooms: {type:Number, default:0, required: true},
    price: {type:Number, default:0, required: true},
    location: {type:String, required: true},
    constructionYear: {type:Number, default:0, required: true},
    wifi: {type:Boolean, default: 0, required: false},
    accessibilty: {type:Boolean, default: 0, required: false},
    hourDate: {type:Date, default: Date.now},
    email: {type:String, required: false},
    contact: {type:String, required: false},
    numAnnouncements: {type:Number, default:0, required: false},
    images: {type: String}
})

module.exports = mongoose.model('Announcement', Announcement)

