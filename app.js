const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const register = require('./routes/register');
const recipes = require('./routes/recipes');
const addRecipe = require('./routes/addRecipe');
const fs = require('fs');
const url =  require('url');
const login = require('./routes/login');
const index = require('./routes/index');
const favourites = require('./routes/favourites');

const recipe_list = require('./routes/recipe_list');
// Database
const db = require('./config/database.js')



// Test DB
db.authenticate()
    .then(() => console.log('Database conncected...'))
    .catch(() => console.log("Error: " + err))

// app.get('/', (req, res) => res.send('HELLO WORLD'));

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, console.log(`Server started on port ${PORT}`));

// This will be our application entry. We'll setup our server here.
const http = require('http');

// Set up the express app
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser());
// Log requests to the console.
app.use(logger('dev'));
// app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req, res) => {
    try{
        res.render('homepage');
    } catch(err) {
        res.send({message: "Error rending homepage", error: err});
    }
})
//Routes for login
app.use('/login',login);
app.use('/register', register);
//User routes for auth
app.use('/index', index);
app.use('/users', users);
app.use('/recipe_list', recipe_list);

//Routes for recipes
app.use('/recipes', recipes);
app.use('/addRecipe', addRecipe);

//Routes for favourites
app.use('/favourites', favourites);

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
    // message: 'Hello world :-)',
}));

const port = parseInt(process.env.PORT, 10) || 5000;
console.log("Starting up on port " + port)
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
module.exports = app;
