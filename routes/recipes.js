const express = require('express');
const Recipe = require('./../models/Recipe');
const Ingredient = require('./../models/Ingredient');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const router = express.Router();

//Get recipes by inputted ingredients
//FORMAT: /recipes?ingredients=a,b,c
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.findAll();
        console.log(recipes)
        res.json(recipes)
    }

    catch(err) {
        res.send({message: "Failed to retrive recipes based on inputted ingredients", error: err});
    }
})

// router.get('/', async (req, res) => {
//     try {
//         const ingredientString = req.query.ingredients.toLowerCase(); //Assuming our ingredients in db will be all lowercase
//         const ingredientArray = ingredientString.split(','); //Break up into array, delimit by comma to get individual ingredient
//         const recipeIds = await Ingredient.findAll({ //find all recipe_ids...
//             attributes: ['recipe_id'],
//             where: {
//                 name: {
//                     [Op.in]: ingredientArray //where ingredient name is in the inputted ingredients array
//                 }
//             }
//         }).map(el => el.get('recipe_id')); //format in array (i think this is how it works?)
//         if(recipeIds == null || recipeIds.length == 0){ //if no results
//             res.send({message: "No recipes contain inputted ingredients"});
//         } else{
//             const recipes = await Recipe.findAll({ //find all recipes...
//                 where: {
//                     recipe_id: {
//                         [Op.in]: recipeIds //where recipe_id is in the returned recipeIds array from 
//                     }
//                 }
//             });
//             res.json(recipes);
//         }
//     } catch (err){
//         res.send({message: "Failed to retrive recipes based on inputted ingredients", error: err});
//     }
// });

module.exports = router;
