const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./../models/User');
const Favourites = require('./../models/Favourites');
const Recipe = require('./../models/Recipe');
const router = express.Router();

//Get all users (FOR TESTING PURPOSES)
router.get('/', async (req, res) => {
    try{
        const users = await User.findAll();
        res.send(users);
    } catch(err) {
        res.send({message: "Failed to retrieve users", error: err});
    }
});

//Register
router.post('/register', async (req, res) => {
    try {
        // hashing inputted password
        await bcrypt.hash(req.body.password, 10, function(err, hashedPassword) {
            if (err) {
                res.send({message: "Failed to add new instance of user", error: err});
            } else {
                User.create({
                    email: req.body.email,
                    password: hashedPassword
            });
            res.json({message: "Successfully added new user", status: "ok"})
        }})
    } catch(err) {
        res.send({message: "Failed to add new instance of user", error: err, status: "poor"});
    }
});

//Login
router.post('/login', async (req, res) => {
    const user = User.findOne({ //retrive hashed password of user with inputted email
        attributes: ['password'],
        where: {
            email: req.body.email
        }
    }).then(resp => {
        if(!resp) {
            return res.send({message: "No existing user with the email " + req.body.email, status:"no-user"});
        } else{
            let dbPassword = resp.dataValues.password;
            bcrypt.compare(req.body.password, dbPassword, function(err, result) {
                if (err){
                    res.send({message: "Failed to login", error: err});
                    return;
                }
                if (result) {
                    res.send({message: "Successful login", status: "valid-password"});
                } else {
                    // response is OutgoingMessage object that server response http request
                    res.send({success: false, status: "bad-password"});
                    return;
                }
            });
        }
    }).catch(err => {
        console.log(err);
    })
});

//Change password
router.put('/:email/password', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); //hashing inputted password
        const updatedUser =  await User.update({ password: hashedPassword}, { //update query
            where: {
                email: req.params.email
            }
        });
        res.json(updatedUser);
    } catch(err) {
        res.send({message: "Failed to update password", error: err});
    }
});

//Get user favourite recipes
router.get('/:email/favourites', async (req, res) => {
    try{
        const recipeIds = await Favourites.findAll({
            attributes: ['recipe_id'],
            where: {
                email: req.params.email
            }
        }).map(el => el.get('recipe_id'));
        if(recipeIds == null || recipeIds.length == 0){
            return res.send({message: "No favourites for the email " + req.params.email});
        }
        const favouriteRecipes = await Recipe.findAll({
            where: {
                recipe_id: {
                    [Op.in]: recipeIds
                }
            }
        });
        res.json(favouriteRecipes);
    } catch(err) {
        res.send({message: "Failed to retrieve favourites", error: err});
    }
});

//Add favourite 
router.post('/:email/favourites', async (req, res) => {
    try{
        const newFavourite = await Favourite.create({
            email: req.params.email,
            recipe_id: req.body.recipe_id
        });
        res.json(newFavourite);
    } catch(err) {
        res.send({message: "Failed to add new favourite" , error: err});
    }
});

//Delete favourite
router.delete('/:email/favourite', async (req, res) => {
    try{
        const deletedFavourite = await Favourites.destroy({
            where: {
                email: req.params.email,
                recipe_id: req.body.recipe_id
            }
        });
        res.json(deletedFavourite);
    }
    catch(err) {
        res.send({message: "Failed to delete favourite instance", error: err});
    }
});

module.exports = router;