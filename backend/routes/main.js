const express = require('express');
const router = express.Router();
const Controller = require('../controllers/main');

router.get('/items', Controller.getItems);
router.get('/item/:id', Controller.getItem);
router.get('/iphone', Controller.GetIphone);
router.get('/ipad', Controller.GetIpad);
router.get('/mac', Controller.GetMac);

module.exports = router;