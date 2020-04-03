const express = require('express');
const Recipe = require('./../models/Recipe');
//const Ingredient = require('./../models/Ingredient');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const router = express.Router();

//Get recipes by inputted ingredients
//FORMAT: /recipes?ingredients=a,b,c&restrictions=d,e,f,&categories=g&difficulty=h
/*
IDEA: 
For ingredients, find results that do contain items.
For restrictions, find results that don't contain that items.
For categories, return items that fit the categories. //ENSURE FIRST LETTER OF EACH WORD IS CAPITALIZED
For difficulty, <=5 steps -> beginner, steps <= 10 -> intermediate, >10 steps -> advanced
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
            const recipes = await Recipe.findAll();
            let restrictionFilteredRecipes = [];
            for(var i in recipes){
                let count = recipes[i].ingredients.length * restrictions.length;
                for(var j in restrictions){
                    for(var k in recipes[i].ingredients){
                        if(!recipes[i].ingredients[k].includes(restrictions[j])){
                            count--;
                        }
                    }
                }
                if(count == 0 && restrictionFilteredRecipes.indexOf(recipes[i].recipe_id) == -1){
                    restrictionFilteredRecipes.push(recipes[i].recipe_id);
                }
            }
            recipeIds = restrictionFilteredRecipes;
        } else if(req.query.ingredients && !req.query.restrictions){ //inputted ingredients but no restrictions
            const ingredients = req.query.ingredients.split(',');
            const recipes = await Recipe.findAll();
            let ingredientFilteredRecipes = [];
            for(var i in recipes){
                for(var j in recipes[i].ingredients){
                    for(var k in ingredients){ 
                        if(recipes[i].ingredients[j].includes(ingredients[k])){
                            if(ingredientFilteredRecipes.indexOf(recipes[i].recipe_id) == -1){
                                ingredientFilteredRecipes.push(recipes[i].recipe_id);
                            }
                        }
                    }
                }
            }
            recipeIds = ingredientFilteredRecipes;
        }
        else{ //both are defined
            const ingredients = req.query.ingredients.split(',');
            const restrictions = req.query.restrictions.split(',');
            const recipes = await Recipe.findAll();
            let restrictionFilteredRecipes = [];
            for(var i in recipes){
                let count = recipes[i].ingredients.length * restrictions.length;
                for(var j in restrictions){
                    for(var k in recipes[i].ingredients){
                        if(!recipes[i].ingredients[k].includes(restrictions[j])){
                            count--;
                        }
                    }
                }
                if(count == 0 && restrictionFilteredRecipes.indexOf(recipes[i].recipe_id) == -1){
                    restrictionFilteredRecipes.push(recipes[i].recipe_id);
                }
            }
            let ingredientFilteredRecipes = [];
            for(var i in recipes){
                for(var j in recipes[i].ingredients){
                    for(var k in ingredients){ 
                        if(recipes[i].ingredients[j].includes(ingredients[k])){
                            if(ingredientFilteredRecipes.indexOf(recipes[i].recipe_id) == -1){
                                ingredientFilteredRecipes.push(recipes[i].recipe_id);
                            }
                        }
                    }
                }
            }
            let intersect = [];
            for(let i = 0; i < restrictionFilteredRecipes.length; i++){
                if(ingredientFilteredRecipes.indexOf(restrictionFilteredRecipes[i]) != -1){
                    intersect.push(restrictionFilteredRecipes[i])
                }
            }
            recipeIds = intersect;
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

        let difficultyCeiling = 1000000; //find recipes with steps less than ceiling
        switch(req.query.difficulty){ 
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
        console.log(finalRecipes.length);
    } catch (err){
        res.send({message: "Failed to retrive recipes based on inputted ingredients", error: err});
    }
});

router.post('/new', async(req, res) => {
    try {
        const newRecipe = await Recipe.create({
            title: req.body.title,
            description: req.body.description,
            ingredients: req.body.ingredients,
            steps: req.body.steps,
            categories: req.body.categories
        });
        res.json(newRecipe)
    } catch(err) {
        res.send({message: "Error adding new recipe", error: err});
    }
});


module.exports = router;
