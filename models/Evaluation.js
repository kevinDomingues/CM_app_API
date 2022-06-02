const mongoose = require('mongoose')

const Evaluation = new mongoose.Schema({
    amountOfStars: {type:Number, required: true},
    evaluationText: {type:String, required: true}
})

module.exports = mongoose.model('Evaluation', Evaluation)

