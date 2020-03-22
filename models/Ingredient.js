const Sequelize = require('sequelize');
const Recipe = require('./Recipe');
const db = require('./index');

const Ingredient = db.sequelize.define('ingredient', {
    ingredient_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
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
    },
    quantity: {
        allowNull: false,
        type: Sequelize.DOUBLE
    }
});

module.exports = Ingredient;