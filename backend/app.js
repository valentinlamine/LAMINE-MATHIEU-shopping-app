const express = require('express');
const rateLimit = require("express-rate-limit");
const ItemsRoutes = require('./routes/main');

const app = express();
const port = 3000;
const ip_add = "localhost"

const cors = require('cors');
const Limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 30, // limit each IP to 30 requests per windowMs
    message: 'Too many requests from this IP, please try again after an minute',
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(Limiter);
app.use(cors({origin: "*"}));
app.use(ItemsRoutes);

app.listen(port, "",  () => {
    console.log(`Example app listening at http://${ip_add}:${port}`)
});