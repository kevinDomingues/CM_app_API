const router = require('express').Router()

const { restart } = require('nodemon')
const Typology = require('../models/Typology')

const auth = require('../auth/auth')

router.get('/check/:id', async(req,res) => {
    const id = req.params.id

    try {
        const typology = await Typology.findById({_id: id})

        if (!typology) {
            res.status(200).json({valid: true})
            return
        }

        res.status(200).json(typology)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.post('/createTypology', async(req,res) => {
    const {idTypology, typologyName} = req.body

    const typology = {
        idTypology,
        typologyName
    }

    if (!idTypology) {
        res.status(422).json({error: 'You must provide ID!'})
    }

    if (!typologyName) {
        res.status(422).json({error: 'You must provide name for typology!'})
    }

    try {
        
        await Typology.create(typology)

        res.status(201).json({message: 'Typology created!'})

    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/', async (req,res) => {
    try {
        
        const typologies = await Typology.find()

        res.status(200).json(typologies)
        
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.patch('/:id', async (req,res) => { 
    
    const id = req.params.id

    const {idTypology, typologyName} = req.body

    const typology = {
        idTypology,
        typologyName
    }

    try {
        
        const updatedTypology = await Typology.updateOne({ _id: id }, typology)

        if(updatedTypology.matchedCount==0){

            res.status(422).json({message: 'Typology with the id inserted was not found!'})
            return

        }

        res.status(200).json(typology)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.delete('/:id', async (req,res) => {

    const id = req.params.id

    const typology = await Typology.findOne({_id: id})

        if(!typology){
            res.status(422).json({message: 'Typology with the id inserted was not found!'})
            return
        }

        try {
            await Typology.deleteOne({_id: id})

            res.status(200).json({message:'Typology deleted with success!'})
            
        } catch (error) {
            res.status(500).json({error: error})
        }

})

module.exports = router