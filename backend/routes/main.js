const express = require('express'); // import express
const router = express.Router(); // create a router
const Controller = require('../controllers/main'); // import the controller

// define the routes
router.get('/items', Controller.getItems);
router.get('/item/:id', Controller.getItem);
router.get('/iphone', Controller.GetIphone);
router.get('/ipad', Controller.GetIpad);
router.get('/mac', Controller.GetMac);

// export the router
module.exports = router;