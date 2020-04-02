const Sequelize = require('sequelize');
const db = require('../config/database.js');

const Recipe = db.define('recipe', {
    recipe_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        allowNull: false,
        type: Sequelize.STRING
    },
    rating: {
        allowNull: true,
        type: Sequelize.INTEGER
    },
    fat: {
        allowNull: true,
        type: Sequelize.INTEGER
    },
    calories: {
        allowNull: true,
        type: Sequelize.INTEGER
    },
    protein: {
        allowNull: true,
        type: Sequelize.INTEGER
    },
    sodium: {
        allowNull: true,
        type: Sequelize.INTEGER
    },
    description: {
        allowNull: true,
        type: Sequelize.TEXT
    },
    ingredients: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.TEXT)
    },
    steps: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.TEXT)
    },
    categories: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.TEXT)
    }
});

module.exports = Recipe;