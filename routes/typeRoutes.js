const router = require('express').Router()

const { restart } = require('nodemon')
const Type = require('../models/Type')

const auth = require('../auth/auth')

router.get('/check/:id', async(req,res) => {
    const id = req.params.id

    try {
        const type = await Type.findById({_id: id})

        if (!type) {
            res.status(200).json({valid: true})
            return
        }

        res.status(200).json(type)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.post('/createType', async(req,res) => {
    const {idType, typeName} = req.body

    const type = {
        idType,
        typeName
    }

    if (!idType) {
        res.status(422).json({error: 'You must provide ID!'})
    }

    if (!typeName) {
        res.status(422).json({error: 'You must provide name for type!'})
    }

    try {
        
        await Type.create(type)

        res.status(201).json({message: 'Type created!'})

    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/', async (req,res) => {
    try {
        
        const typologies = await Type.find()

        res.status(200).json(typologies)
        
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.patch('/:id', async (req,res) => { 
    
    const id = req.params.id

    const {idType, typeName} = req.body

    const type = {
        idType,
        typeName
    }

    try {
        
        const updatedType = await Type.updateOne({ _id: id }, type)

        if(updatedType.matchedCount==0){

            res.status(422).json({message: 'Type with the id inserted was not found!'})
            return

        }

        res.status(200).json(type)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.delete('/:id', async (req,res) => {

    const id = req.params.id

    const type = await Type.findOne({_id: id})

        if(!type){
            res.status(422).json({message: 'Type with the id inserted was not found!'})
            return
        }

        try {
            await Type.deleteOne({_id: id})

            res.status(200).json({message:'Type deleted with success!'})
            
        } catch (error) {
            res.status(500).json({error: error})
        }

})

module.exports = router