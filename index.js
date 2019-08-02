// index.js
const express = require('express');
const bodyParser = require('body-parser');
// inicializar app express
const app = express();


const config = require('./config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


// default route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to ZeptoBook Product app"});
});

// listen on port 3000
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});