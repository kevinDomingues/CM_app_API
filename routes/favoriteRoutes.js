const router = require('express').Router()
const { restart } = require('nodemon')
const Food = require('../models/Favorite')

const auth = require("../auth/auth")
const Favorite = require('../models/Favorite')
const Announcement = require('../models/Announcement')

router.get('/getFavorites', auth, async (req,res) => {
    const idUser = req.user_id;

    try {
        var announcementsArray = []
        const favorites = await Favorite.find({idUser: idUser})
        const announcements = await Announcement.find();

        if(!favorites){
            res.status(422).json({message: 'No favorite matching the id!'})
            return
        }

        favorites.forEach(async function(favorites) {
            try {
                announcements.forEach(async function (announcement) {
                    if (announcement._id == favorites.idAnnouncement) {
                        favorites = {
                            _id: favorites._id,
                            idAnnouncement: favorites.idAnnouncement,
                            idUser: favorites.idUser,
                            name: announcement.name,
                            type: announcement.type,
                            rooms: announcement.rooms,
                            netArea: announcement.netArea,
                            bathrooms: announcement.bathrooms,
                            price: announcement.price,
                            location: announcement.location,
                            constructionYear: announcement.constructionYear,
                            wifi: announcement.wifi,
                            accessibilty: announcement.accessibilty,
                            hourDate: announcement.hourDate,
                            email: announcement.email,
                            contact: announcement.contact
                        }
                        announcementsArray.push(favorites);
                    }
                  });

            } catch (error) {
                res.status(500).json({error: error})
            }
        });

        res.status(200).json(announcementsArray)


    } catch (error) {
        res.status(500).json({error: error})
    }
})
router.get('/getLatest', auth, async (req,res) => {
    const idUser = req.user_id;
    try {
        
        const favorite = await Favorite.findOne({idUser: idUser}).sort({"dataHora": -1}).limit(1)
        if(!favorite){
            res.status(422).json({empty: 'Empty list'})
            return
        }
        res.status(200).json(favorite)
    } catch (error) {
        res.status(500).json({error: error})
    }
})
router.post('/registerFavorite', auth, async(req,res) => {
    const {idAnnouncement} = req.body
    const idUser = req.user_id;
    const favorite = {
        idUser,
        idAnnouncement
    }
    if(!idUser){
        res.status(422).json({error: 'No ID obtained!'})
        return
    }
    if(!favorite){
        res.status(422).json({error: 'You must provide Favorite!'})
        return
    }
    try {
        
        await Favorite.create(favorite)
        res.status(201).json({message:'Favorite created!'})
        
    } catch (error) {
        res.status(500).json({error: error})
    }
    
})
router.get('/', auth, async (req,res) => {
    try {
        const favorites = await Favorite.find()
        res.status(200).json(favorites)
        
    } catch (error) {
        res.status(500).json({error: error})
    }
})
router.get('/:id', auth, async (req,res) => {
    const id = req.params.id;
    try {
        
        const favorite = await Favorite.findOne({_id: id})
        if(!favorite){
            res.status(422).json({message: 'You must provide a valid ID!'})
            return
        }
        res.status(200).json(favorite)
    } catch (error) {
        res.status(500).json({error: error})
    }
})
router.patch('/update/:id', auth, async (req,res) => { 
    
    const idFavorite = req.params.id
    const idUser = req.user_id;
    const {idAnnouncement} = req.body
    const favorite = {
        idUser,
        idAnnouncement
    }
    try {
        
        const updatedFavorite = await Favorite.updateOne({ _id: idFavorite }, favorite)
        if(updatedFavorite.matchedCount==0){
            res.status(422).json({message: 'Favorite was not found!'})
            return
        }
        res.status(200).json(favorite)
    } catch (error) {
        res.status(500).json({error: error})
    }
})
router.delete('/delete/:id', auth, async (req,res) => {
    const idFavorite = req.params.id
    const favorite = await Favorite.findOne({_id: idFavorite})
        if(!favorite){
            res.status(422).json({message: 'Favorite was not found!'})
            return
        }
        try {
            await Favorite.deleteOne({_id: idFavorite})
            res.status(200).json({message:'Favorite deleted with success!'})
            
        } catch (error) {
            res.status(500).json({error: error})
        }
})
module.exports = router