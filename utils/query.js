// Database
const db = require('../config/database.js')
const Recipe = require('../models/Recipe')
const User = require('../models/User')

// Test DB
db.authenticate()
    .then(() => console.log('Database conncected...'))
    .catch(() => console.log("Error: " + err))

User.findAll().then(res => console.log(res));
