const Sequelize = require('sequelize');
const db = require('./index');
const Recipe = require('./Recipe');
const Category = require('./Category');

const CategorizedRecipe = db.sequelize.define('categorizedRecipe', {
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