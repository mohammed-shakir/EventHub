const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const { auth, admin } = require('../middleware/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', userController.getUserProfile);
router.put('/profile', userController.updateUserProfile);
router.delete('/profile', userController.deleteUserProfile);
router.delete('/admin_delete_user/:userId', auth, admin, userController.adminDeleteUser);
router.get('/get_all_users', auth, admin, userController.getAllUsers);
router.post('/auth/google', userController.authGoogle);

module.exports = router;