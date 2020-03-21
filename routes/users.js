const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./../models/User');
const router = express.Router();

//Register
router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({
            email: req.body.email,
            password: hashedPassword
        });
        res.json(newUser);
    } catch(err) {
        res.send({message: "Failed to add new instance of user", error: err});
    }
});
