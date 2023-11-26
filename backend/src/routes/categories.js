const categoryController = require('../controllers/categoryController');
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

router.get('/get_categories', categoryController.getCategories);
router.post('/add_category', 
    body('name').notEmpty(),
    body('description').notEmpty(),
    categoryController.addCategory
);
router.put('/update_category/:categoryId', categoryController.updateCategory);
router.delete('/delete_category/:categoryId', categoryController.deleteCategory);

module.exports = router;