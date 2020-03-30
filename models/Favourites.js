const Sequelize = require('sequelize');
const Recipe = require('./Recipe');
const User = require('./User');
const db = require('../config/database.js');

const Favourites = db.define('favourites', {
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
    email: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        references: {
            model: User,
            key: 'email',
            as: 'email'
        }
    }
});

module.exports = Favourites;