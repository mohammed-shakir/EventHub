const express = require('express');
const { body } = require('express-validator');
const eventController = require('../controllers/eventController');
const router = express.Router();
const { auth, admin } = require('../middleware/auth');
const upload = require('../middleware/multerConfig');

router.get('/', eventController.getEvents);
router.post('/addEvent', 
    body('title').notEmpty(),
    eventController.addEvent
);
router.get('/:eventId', eventController.getEventById);
router.post('/register/:eventId', eventController.registerForEvent);
router.put('/:eventId', eventController.updateEvent);
router.delete('/:eventId', eventController.deleteEvent);
router.delete('/admin_delete_event/:eventId', auth, admin, eventController.adminDeleteEvent);
router.post('/uploadEventPicture', auth, upload.single('eventPic'), eventController.uploadEventPicture);

module.exports = router;