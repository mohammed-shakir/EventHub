const pool = require('../utils/database');

exports.register = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).send('Missing parameters');
    } else {
        res.status(200).send('Registration successful');
    }
};

exports.login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).send('Missing parameters');
    } else {
        res.status(200).send('Login successful');
    }
};

exports.getUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).send('Server error');
    }
};