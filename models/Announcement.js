const mongoose = require('mongoose')

const Announcement = mongoose.model({
    idAnnouncement: {type:String, required: true},
    type: {type:Number, default:0, required: true},
    typology: {type:Number, default:0, required: true},
    netArea: {type:Number, default:0, required: true},
    bathrooms: {type:Number, default:0, required: true},
    price: {type:Number, default:0, required: true},
    location: {type:String, required: true},
    constructionYear: {type:Number, default:0, required: true}
})

module.exports = mongoose.model('Announcement', Announcement)

