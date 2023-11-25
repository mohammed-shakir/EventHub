const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();
const { auth, admin } = require('../middleware/auth');

router.get('/', eventController.getEvents);
router.post('/addEvent', eventController.addEvent);
router.get('/:eventId', eventController.getEventById);
router.post('/register/:eventId', eventController.registerForEvent);
router.delete('/admin_delete_event/:eventId', auth, admin, eventController.adminDeleteEvent);

module.exports = router;