const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

//mongodb setup
const mongoDB = require('./src/database/mongo.db');
mongoDB.connect();

// custom require
const MainRouters = require('./mainRoutes');

// port value init
const { PORT = 3000 } = process.env;

// app setup
const app = express();

//static file setup
app.use(express.static('public'));

//json for the request
app.use(express.json());

// app routes setup
app.use('/', new MainRouters().getRoutes());

// server port listen setup
app.listen(
    PORT,
    () => console.log(`SERVER is running at ${PORT}`)
);