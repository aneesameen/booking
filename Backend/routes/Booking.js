const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking.js")
const jwt = require("jsonwebtoken");
const jwtSecret = 'hjwdj$jhgjvgg54e6rgvjh68';

// -----------------------------Booking a new place----------------------

router.post("/bookings", (req, res) => {
    const { token } = req.cookies;
    const { place, checkIn, checkOut, noOfGuests, name, phoneNo, price } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        await Booking.create({
            owner: userData.id, place, checkIn, checkOut, noOfGuests, name, phoneNo, price
        }).then((doc) => {
            res.json(doc)
        }).catch((err) => {
            throw err;
        });
    })
});


// -----------------------------getting all booked places of a user----------------------

router.get('/bookings', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const { id } = userData;
        res.json(await Booking.find({ owner: id }).populate("place"))
    })
})


// -----------------------------Delete the booking of this id----------------------

router.delete("/booking/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Booking.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting in booking', error });
    }
})


module.exports = router;
