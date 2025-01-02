const express = require("express");
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const router = express.Router();

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = 'hjwdj$jhgjvgg54e6rgvjh68';


// --------------------register User-------------------

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        });

        res.json(userDoc);

    } catch (e) {
        res.status(422).json(e)
    }
})


// --------------------login User-------------------

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if (passOk) {
            jwt.sign({
                email: userDoc.email,
                id: userDoc._id,
            },
                jwtSecret, {}, (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json(userDoc)
                });
        } else {
            res.status(422).json("wrong password")
        }
    } else {
        res.json("not found");
    }
})


// --------------------profile of User-------------------

router.get("/profile", (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { name, email, _id } = await User.findById(userData.id);
            res.json({ name, email, _id })
        });
    } else {
        res.json(null);
    }
})


// --------------------logout User-------------------

router.post("/logout", (req, res) => {
    res.cookie("token", "").json(true)
})


module.exports = router;
