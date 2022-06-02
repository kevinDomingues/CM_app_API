const router = require('express').Router()

const { restart } = require('nodemon')
const Evaluation = require('../models/Evaluation')

const auth = require('../auth/auth')

router.get('/check/:id', async(req,res) => {
    const id = req.params.id

    try {
        const evaluation = await Evaluation.findById({_id: id})

        if (!evaluation) {
            res.status(200).json({valid: true})
            return
        }

        res.status(200).json(evaluation)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.post('/createEvaluation', async(req,res) => {
    const {ammountOfStars, evaluationText} = req.body

    const evaluation = {
        ammountOfStars,
        evaluationText
    }

    if (!ammountOfStars) {
        res.status(422).json({error: 'You must provide the evaluation from 1 to 5!'})
    }

    if (!evaluationText) {
        res.status(422).json({error: 'The evaluation must have text!'})
    }

    try {
        
        await Evaluation.create(evaluation)

        res.status(201).json({message: 'Evaluation created!'})

    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/', async (req,res) => {
    try {
        
        const evaluations = await Evaluation.find()

        res.status(200).json(evaluations)
        
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.delete('/:id', async (req,res) => {

    const id = req.params.id

    const evaluation = await Evaluation.findOne({_id: id})

        if(!evaluation){
            res.status(422).json({message: 'Evaluation with the id inserted was not found!'})
            return
        }

        try {
            await Evaluation.deleteOne({_id: id})

            res.status(200).json({message:'Evaluation deleted with success!'})
            
        } catch (error) {
            res.status(500).json({error: error})
        }

})

module.exports = router