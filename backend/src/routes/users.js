const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', userController.getUserProfile);
router.put('/profile', userController.updateUserProfile);
router.delete('/profile', userController.deleteUserProfile);
router.post('/auth/google', userController.authGoogle);

module.exports = router;