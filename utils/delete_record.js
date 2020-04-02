// Database
const db = require('../config/database.js')
const Recipe = require('../models/Recipe')

// Test DB
db.authenticate()
    .then(() => console.log('Database conncected...'))
    .catch(() => console.log("Error: " + err))

// delete record 
Recipe.destroy({where: {}}).then(res => console.log(res))