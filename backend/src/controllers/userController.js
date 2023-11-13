const pool = require('../utils/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { email, password, first_name, last_name, user_role } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    // Allow only 'Regular' or 'Organizer' roles to be set by users
    const validRoles = ['Regular', 'Organizer'];
    const role = validRoles.includes(user_role) ? user_role : 'Regular';

    try {
        // Check if user already exists
        const userExists = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(409).send('User already exists with this email');
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user into database
        await pool.query(
            'INSERT INTO Users (email, password, first_name, last_name, user_role) VALUES ($1, $2, $3, $4, $5)',
            [email, hashedPassword, first_name, last_name, role]
        );

        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    try {
        // Check if user exists
        const userResult = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);
        if (userResult.rows.length === 0) {
            return res.status(404).send('User not found');
        }

        const user = userResult.rows[0];

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }

        // Generate JWT token
        const token = jwt.sign(
            { user_id: user.user_id, role: user.user_role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userResult = await pool.query('SELECT email, user_role FROM Users WHERE user_id = $1', [decoded.user_id]);
        if (userResult.rows.length === 0) {
            return res.status(404).send('User not found');
        }

        const user = userResult.rows[0];
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};