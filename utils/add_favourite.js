// Database
const db = require('../config/database.js');
const Favourites = require('../models/Favourites');

// Test DB
db.authenticate()
    .then(() => console.log('Database conncected...'))
    .catch(() => console.log("Error: " + err))

Favourites.create({
    email: "ryan@iscool.com",
    recipe_id: "508"
});