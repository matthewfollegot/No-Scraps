const Sequelize = require('sequelize');
const db = require('../config/database.js');

const User = db.define('user', {
    email: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
    },
    password: {
        allowNull: false,
        type: Sequelize.STRING
    }
});

module.exports = User;