const Sequelize = require('sequelize');
const db = require('../config/database.js');


const Category = db.define('category', {
    category: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
    }
});

module.exports = Category;