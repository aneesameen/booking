const express = require("express");
const router = express.Router();
const Place = require("../models/Place.js");
const jwt = require("jsonwebtoken");
const jwtSecret = 'hjwdj$jhgjvgg54e6rgvjh68';


// ----------------------Add a new place-----------------

router.post("/places", (req, res) => {
    const { token } = req.cookies;
    const {
        title, address, addedPhotos, description,
        perks, extraInfo, checkIn, checkOut, maxGuest
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id,
            title, address, photos: addedPhotos, description,
            perks, extraInfo, checkIn, checkOut, maxGuest
        });
        res.json(placeDoc);
    })
})


// -----------------------Get all places-----------------

router.get("/places", (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const { id } = userData;
        res.json(await Place.find({ owner: id }))
    })
})


// -----------------------Get one places of this id-----------------

router.get("/places/:id", async (req, res) => {
    const { id } = req.params;
    res.json(await Place.findById(id))
})

// -----------------------update the places of this id-----------------

router.put("/places", async (req, res) => {
    const { token } = req.cookies;
    const {
        id, title, address, addedPhotos, description,
        perks, extraInfo, checkIn, checkOut, maxGuest
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.findById(id);
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, photos: addedPhotos, description,
                perks, extraInfo, checkIn, checkOut, maxGuest
            })
            await placeDoc.save()
            res.json("ok");
        }
    })
})


// -----------------------Delete the places of this id-----------------

router.delete('/places/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Place.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Place deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting place', error });
    }
});

module.exports = router;