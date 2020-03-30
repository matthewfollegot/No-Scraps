const Sequelize = require('sequelize');
const Recipe = require('./Recipe');
const db = require('../config/database.js');

const Step = db.define('step', {
    step_no: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    recipe_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        onDelete: '', //@TODO
        references: {
            model: Recipe,
            key: 'recipe_id',
            as: 'recipe_id'
        }
    },
    description: {
        allowNull: false,
        type: Sequelize.STRING
    }
});

module.exports = Step;