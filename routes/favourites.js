const express = require('express');
const User = require('../models/User');
const Favourites = require('../models/Favourites');
const Recipe = require('../models/Recipe');
const router = express.Router();

// query favourites
router.post('/', async (req, res) => {
    try {
        const recipes = await Favourite.findAll({ //creating new instance (row) and adding to db
            where: {
                email: req.body.email
            }
        });
        res.json(recipes);
    } catch(err) {
        res.send({message: "Failed to retrieve favourites", error: err});
    }
});

// add favourite
router.post('/add', async (req, res) => {
    try {
        const newFavourite = await Favourite.create({ //creating new instance (row) and adding to db
            recipe_id: req.body.recipe_id,
            email: req.body.email
        });
    } catch(err) {
        res.send({message: "Failed to add favourite", error: err});
    }
});

// remove favourite
router.delete('/remove', async (req, res) => {
    try {
        const newFavourite = await Favourite.destroy({ //creating new instance (row) and adding to db
            where: {
                recipe_id: req.body.recipe_id,
                email: req.body.email
            }
        });
        res.json(newUser);
    } catch(err) {
        res.send({message: "Failed to remove favourite", error: err});
    }
});

module.exports = router;
