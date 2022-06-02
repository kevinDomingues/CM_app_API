const mongoose = require('mongoose')

const Evaluation = new mongoose.Schema({
    ammountOfStars: {type:Number, required: true},
    evaluationText: {type:String, required: true}
})

module.exports = mongoose.model('Evaluation', Evaluation)

