const express = require('express');
const router = express.Router();
const Controller = require('../controllers/sneaker');

router.get('/sneakers', Controller.getSneakers);
router.get('/sneaker/:id', Controller.getSneaker);
/*
router.post('/sneaker', Controller.addSneaker);
router.put('/sneaker/:id', Controller.updateSneaker);
router.delete('/sneaker/:id', Controller.deleteSneaker);
*/

module.exports = router;