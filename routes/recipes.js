const express = require('express');
const Recipe = require('./../models/Recipe');
//const Ingredient = require('./../models/Ingredient');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const router = express.Router();

//Get recipes by inputted ingredients
//FORMAT: /recipes?ingredients=a,b,c&restriction=d,e,f,&categories=g&recipeDifficulty=h
/*
IDEA: 
For ingredients, find results that do contain items.
For restrictions, find results that don't contain that items.
For categories, return items that fit the categories. //ENSURE FIRST LETTER OF EACH WORD IS CAPITALIZED
For recipeDifficulty, <=5 steps -> beginner, steps <= 10 -> intermediate, >10 steps -> advanced
*/

router.get('/', async (req, res) => {
    try {
        let recipeIds = []; //will hold all the recipe_ids of the recipes that fulfil the queries

        //Handle inputted ingredients and restrictions
        if(!req.query.ingredients && !req.query.restrictions){ //neither ingredients or restriction
            const recipes = await Recipe.findAll().map(el => el.get('recipe_id'));
            recipeIds = recipes;
        } else if(!req.query.ingredients && req.query.restrictions){ //no ingredients but restrictions inputted
            const restrictions = req.query.restrictions.split(',');
            const recipes = await Recipe.findAll({
                where: {
                    [Op.not]: {
                        ingredients: {
                            [Op.contains]: restrictions //has to be exact match
                        }
                    }
                }
            }).map(el => el.get('recipe_id'));
            recipeIds = recipes;
        } else if(req.query.ingredients && !req.query.restrictions){ //inputted ingredients but no restrictions
            const ingredients = req.query.ingredients.split(',');
            const recipes = await Recipe.findAll({
                where: {
                    ingredients: {
                        [Op.contains]: ingredients //has to be exact match
                    }
                }
            }).map(el => el.get('recipe_id'));
            recipeIds = recipes;
        }
        else{ //both are defined
            const ingredients = req.query.ingredients.split(',');
            const restrictions = req.query.restrictions.split(',');
            const recipes = await Recipe.findAll({
                where: {
                    ingredients: {
                        [Op.contains]: ingredients
                    },
                    [Op.not]:{
                        ingredients: {
                            [Op.contains]: restrictions
                        }
                    }
                }
            }).map(el => el.get('recipe_id'));
            recipeIds = recipes;
        }
        
        //Handle categories
        if(req.query.categories){ //category inputted
            const categories = req.query.categories.split(',');
            const recipes = await Recipe.findAll({
                where: {
                    categories: {
                        [Op.contains]: categories
                    }
                }
            }).map(el => el.get('recipe_id'));
            let intersect = [];
            for(let i = 0; i < recipes.length; i++){ //only add recipes that fulfil ingredient, restriction and category constraints
                if(recipeIds.indexOf(recipes[i]) != -1){
                    intersect.push(recipes[i]);
                }
            }
            recipeIds = intersect;
        }

        let difficultyFloor = 0; //assigning numeric value, find recipes with steps greater than floor
        let difficultyCeiling = 1000000; //find recipes with steps less than ceiling
        switch(req.query.recipeDifficulty){ 
            case "beginner":
                difficultyCeiling = 6;
                break;
            case "intermediate":
                difficultyFloor = 5;
                difficultyCeiling = 11;
                break;
            case "advanced": 
                difficultyFloor = 10;
                break;
            default: 
                difficultyFloor = 0;
                difficultyCeiling = 1000000;
        }

        const recipesWithoutDifficulty = await Recipe.findAll({
            where: {
                recipe_id: {
                    [Op.in]: recipeIds
                }
            }
        });

        let finalRecipes = [];
        for(let i = 0; i < recipesWithoutDifficulty.length; i++){
            if(recipesWithoutDifficulty[i].steps.length >= difficultyFloor && recipesWithoutDifficulty[i].steps.length < difficultyCeiling){
                finalRecipes.push(recipesWithoutDifficulty[i]);
            }
        }
        res.send(finalRecipes);
    } catch (err){
        res.send({message: "Failed to retrive recipes based on inputted ingredients", error: err});
    }
});


module.exports = router;
