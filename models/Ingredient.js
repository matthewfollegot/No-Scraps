const Sequelize = require('sequelize');
const Recipe = require('./Recipe');
const db = require('../config/database.js');

const Ingredient = db.define('ingredient', {
    ingredient_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        autoIncrement: true
    },
    recipe_id: {
        allowNull: false,
        type: Sequelize.STRING,
        onDelete: '', //@TODO
        references: {
            model: Recipe,
            key: 'recipe_id',
            as: 'recipe_id'
        }
    },
    name: {
        allowNull: false,
        type: Sequelize.STRING
    }
});

module.exports = Ingredient;