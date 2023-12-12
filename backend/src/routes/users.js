const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const router = express.Router();
const { auth, admin } = require('../middleware/auth');
const upload = require('../middleware/multerConfig');

router.post('/register',
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    userController.register
);
router.post('/login',
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    userController.login
);
router.get('/profile', userController.getUserProfile);
router.put('/profile', userController.updateUserProfile);
router.delete('/profile', userController.deleteUserProfile);
router.delete('/admin_delete_user/:userId', auth, admin, userController.adminDeleteUser);
router.get('/get_all_users', auth, admin, userController.getAllUsers);
router.post('/auth/google', userController.authGoogle);
router.post('/profile/picture', auth, upload.single('profilePic'), userController.uploadUserProfilePicture);

module.exports = router;