const router = require('express').Router()

const { restart } = require('nodemon')
const multer = require('multer')

const auth = require("../auth/auth")
const Announcement = require('../models/Announcement')
const req = require('express/lib/request')
const path = require('path')

const storage = multer.diskStorage({
    destination: 'images',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() 
           + path.extname(file.originalname))
  }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2048 * 2048 * 6
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return cb(new Error('Please upload a Image'))
        }
        cb(undefined, true)
    }
})

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

router.post('/registerAnnouncement', auth, upload.array('images', 10), async(req, res) => {
    const idUser = req.user_id;
    let images = ''

    if(req.files) {
        let path = ''
        req.files.forEach(function(files, index, arr){
            path = path + files.path + ","
        })
        path = path.substring(0, path.lastIndexOf(","))
        images = path
    }

    const {name, type, rooms, netArea, bathrooms, price, location, constructionYear, accessibility, hourDate, email, contact} = req.body

    let announcement = {
        idUser,
        name,
        type,
        rooms,
        netArea, 
        bathrooms, 
        price, 
        location, 
        constructionYear, 
        wifi,
        accessibility,
        hourDate,
        email,
        contact,
        images
    }

    if(!idUser){
        res.status(422).json({error: 'You must provide a valid ID!'})
        return
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

    const {name, type, rooms, netArea, bathrooms, price, location, constructionYear, accessibility, hourDate, email, contact} = req.body

    let announcement = {
        idUser,
        name,
        type,
        rooms,
        netArea, 
        bathrooms, 
        price, 
        location, 
        constructionYear, 
        wifi,
        accessibility,
        hourDate,
        email,
        contact
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