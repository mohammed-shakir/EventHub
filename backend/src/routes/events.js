const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();

router.get('/', eventController.getEvents);
router.post('/addEvent', eventController.addEvent);
router.get('/:eventId', eventController.getEventById);
router.post('/register/:eventId', eventController.registerForEvent);
router.put('/:eventId', eventController.updateEvent);
router.delete('/:eventId', eventController.deleteEvent);

module.exports = router;