const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const recipes = require('./routes/recipes');
const fs = require('fs');
const url =  require('url');
const logintwo = require('./routes/logintwo');

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
// Log requests to the console.
app.use(logger('dev'));
// app.use(express.static(path.join(__dirname,'public')));

//User routes for auth
app.use('/users', users);

//Routes for recipes
app.use('/recipes', recipes)

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/logintwo',logintwo)





// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
    message: 'Hello world :-)',
}));

app.get('/logintwo', function(req,res){
    res.send('logintwo')
})

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
module.exports = app;
