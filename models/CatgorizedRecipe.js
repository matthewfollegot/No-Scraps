const Sequelize = require('sequelize');
const Recipe = require('./Recipe');
const Category = require('./Category');
const db = require('../config/database.js');

const CategorizedRecipe = db.define('categorizedRecipe', {
    recipe_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        references: {
            model: Recipe,
            key: 'recipe_id',
            as: 'recipe_id'
        }
    },
    category: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        references: {
            model: Category,
            key: 'category',
            as: 'category'
        }
    }
});

module.exports = CategorizedRecipe;