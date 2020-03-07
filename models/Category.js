const Sequelize = require('sequelize');
const db = require('./index');

const Category = db.sequelize.define('category', {
    category: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
    }
});

module.exports = Category;