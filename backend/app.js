const express = require('express');

const app = express();
const port = 3000;
const ip_add = "localhost"

const cors = require('cors');

app.use(cors({
    origin: "*"
}));

const ItemsRoutes = require('./routes/main');

app.use(ItemsRoutes);


app.listen(port, "",  () => {
    console.log(`Example app listening at http://${ip_add}:${port}`)
});