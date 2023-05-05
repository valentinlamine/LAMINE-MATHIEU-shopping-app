//List of required packages
const express = require('express');
const rateLimit = require("express-rate-limit"); 
const ItemsRoutes = require('./routes/main');

//Create express app
const app = express();
const port = 3000;
const ip_add = "25.11.144.33"

//Set up express app
const cors = require('cors'); 
const Limiter = rateLimit({ // rate limiter middleware
    windowMs: 60 * 1000, // 1 minute
    max: 30, // limit each IP to 30 requests per windowMs
    message: 'Too many requests from this IP, please try again after an minute',
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(Limiter); //  apply to all requests
app.use(cors({origin: "*"})); // allow cross-origin requests
app.use(ItemsRoutes); // use the routes

//Start the server
app.listen(port, "",  () => { 
    console.log(`Example app listening at http://${ip_add}:${port}`) // log the port
});