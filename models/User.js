const Sequelize = require('sequelize');
const db = require('./index');

const User = db.sequelize.define('user', {
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