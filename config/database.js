const Sequelize = require('sequelize')
const db_config = require('./db_config')

module.exports = new Sequelize(
    db_config.db_name,
    db_config.username,
    db_config.password, {
        host: 'localhost',
        dialect: 'postgres',

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
});
