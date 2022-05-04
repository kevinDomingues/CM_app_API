const router = require('express').Router()

const { restart } = require('nodemon')
const Food = require('../models/Announcement')

const auth = require("../auth/auth")
const Announcement = require('../models/Announcement')

router.get('/getAnnouncements', auth, async (req,res) => {
    const idUser = req.user_id;

    try {
        const announcements = await Announcement.find({idUser: idUser}).sort({"dataHora": -1})

        if(!announcements){
            res.status(422).json({message: 'No announcement matching the id!'})
            return
        }

        res.status(200).json(announcements)


    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/getLatest', auth, async (req,res) => {

    const idUser = req.user_id;

    try {
        
        const announcement = await Announcement.findOne({idUser: idUser}).sort({"dataHora": -1}).limit(1)

        if(!announcement){
            res.status(422).json({empty: 'Empty list'})
            return
        }

        res.status(200).json(announcement)


    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.post('/registerAnnouncement', auth, async(req,res) => {
    const {type, typology, netArea, bathrooms, price, location, constructionYear, hourDate} = req.body
    const idUser = req.user_id;

    const announcement = {
        idUser,
        type,
        typology,
        netArea, 
        bathrooms, 
        price, 
        location, 
        constructionYear, 
        hourDate
    }

    if(!announcement){
        res.status(422).json({error: 'You must provide Announcement!'})
        return
    }

    try {
        
        await Announcement.create(announcement)

        res.status(201).json({message:'Announcement created!'})
        
    } catch (error) {
        res.status(500).json({error: error})
    }
    

})

router.get('/', auth, async (req,res) => {
    try {
        const announcements = await Announcement.find()

        res.status(200).json(announcements)
        
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/:id', auth, async (req,res) => {

    const id = req.params.id;

    try {
        
        const announcement = await Announcement.findOne({_id: id})

        if(!announcement){
            res.status(422).json({message: 'You must provide a valid ID!'})
            return
        }

        res.status(200).json(announcement)


    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.patch('/update/:id', auth, async (req,res) => { 
    
    const idAnnouncement = req.params.id

    const {type, typology, netArea, bathrooms, price, location, constructionYear, hourDate} = req.body

    const announcement = {
        type,
        typology,
        netArea, 
        bathrooms, 
        price, 
        location, 
        constructionYear, 
        hourDate
    }

    try {
        
        const updatedAnnouncement = await Announcement.updateOne({ _id: idAnnouncement }, announcement)

        if(updatedAnnouncement.matchedCount==0){

            res.status(422).json({message: 'Announcement was not found!'})
            return

        }

        res.status(200).json(announcement)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.delete('/delete/:id', auth, async (req,res) => {

    const idAnnouncement = req.params.id

    const announcement = await Announcement.findOne({_id: idAnnouncement})

        if(!announcement){
            res.status(422).json({message: 'Announcement was not found!'})
            return
        }

        try {
            await Announcement.deleteOne({_id: idAnnouncement})

            res.status(200).json({message:'Announcement deleted with success!'})
            
        } catch (error) {
            res.status(500).json({error: error})
        }

})


module.exports = router