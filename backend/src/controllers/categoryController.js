const pool = require('../utils/database');
const { validationResult } = require('express-validator');

exports.getCategories = async (req, res) => {
    try {
        const categories = await pool.query('SELECT * FROM Categories');
        res.json(categories.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

exports.addCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, description } = req.body;
    try {
        const newCategory = await pool.query(
            'INSERT INTO Categories (name, description) VALUES ($1, $2) RETURNING *',
            [name, description]
        );
        res.json(newCategory.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

exports.updateCategory = async (req, res) => {
    const { categoryId } = req.params;
    const { name, description } = req.body;

    try {
        const updateQuery = `
            UPDATE Categories SET name = $1, description = $2 WHERE category_id = $3 RETURNING *`;
        const updatedCategory = await pool.query(updateQuery, [name, description, categoryId]);

        if (updatedCategory.rows.length === 0) {
            return res.status(404).send('Category not found');
        }

        res.json(updatedCategory.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

exports.deleteCategory = async (req, res) => {
    const { categoryId } = req.params;

    try {
        await pool.query('DELETE FROM Categories WHERE category_id = $1', [categoryId]);
        res.status(200).send('Category deleted successfully');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};