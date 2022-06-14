const mongoose = require('mongoose')

const Favorites = new mongoose.Schema({
    idUser: {type:String, required: true},
    idAnnouncement: {type:String, required: true} 
})

module.exports = mongoose.model('Favorites', Favorites)

