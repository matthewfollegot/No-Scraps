const Sequelize = require('sequelize');
const db = require('../config/database.js');

const Recipe = db.define('recipe', {
    recipe_id:{
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
    },
    title: {
        allowNull: false,
        type: Sequelize.STRING
    },
    rating: {
        allowNull: true,
        type: Sequelize.DOUBLE
    },
    fat: {
        allowNull: true,
        type: Sequelize.DOUBLE
    },
    calories: {
        allowNull: true,
        type: Sequelize.DOUBLE
    },
    protein: {
        allowNull: true,
        type: Sequelize.DOUBLE
    },
    sodium: {
        allowNull: true,
        type: Sequelize.DOUBLE
    }
});

module.exports = Recipe;