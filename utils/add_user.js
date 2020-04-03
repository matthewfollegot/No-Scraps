// Database
const db = require('../config/database.js')
const User = require('../models/User')

// Test DB
db.authenticate()
    .then(() => console.log('Database conncected...'))
    .catch(() => console.log("Error: " + err))

User.create({
    email: "goodbye",
    password: "hello"
})