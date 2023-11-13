const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();

router.post('/addEvent', eventController.addEvent);

module.exports = router;