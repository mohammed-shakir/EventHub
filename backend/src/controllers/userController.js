const pool = require('../utils/database');

exports.register = async (req, res, next) => {
    console.log('register');
    res.send('Registration successful');
};

exports.login = async (req, res, next) => {
    console.log('login');
    res.send('Login successful');
};

exports.getUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).send('Server error');
    }
};