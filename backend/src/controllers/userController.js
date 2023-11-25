const pool = require('../utils/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { email, password, first_name, last_name, user_role } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    const validRoles = ['Regular', 'Organizer'];
    const role = validRoles.includes(user_role) ? user_role : 'Regular';

    try {
        const userExists = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(409).send('User already exists with this email');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
            'INSERT INTO Users (email, password, user_role) VALUES ($1, $2, $3) RETURNING user_id',
            [email, hashedPassword, role]
        );

        const userId = newUser.rows[0].user_id;
        await pool.query(
            'INSERT INTO Profiles (user_id, first_name, last_name) VALUES ($1, $2, $3)',
            [userId, first_name, last_name]
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
        const userResult = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);
        if (userResult.rows.length === 0) {
            return res.status(404).send('User not found');
        }

        const user = userResult.rows[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }

        const token = jwt.sign(
            { user_id: user.user_id, role: user.user_role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
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

        const userResult = await pool.query(`
            SELECT u.user_id, u.email, u.user_role, p.first_name, p.last_name, p.profile_picture_url, p.bio 
            FROM Users u 
            INNER JOIN Profiles p ON u.user_id = p.user_id 
            WHERE u.user_id = $1`, [decoded.user_id]);
        
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

exports.updateUserProfile = async (req, res) => {
    const { email, first_name, last_name, profile_picture_url, bio } = req.body;
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!email || !first_name || !last_name) {
            return res.status(400).send('Required fields are missing');
        }

        await pool.query('UPDATE Users SET email = $1 WHERE user_id = $2', [email, decoded.user_id]);

        await pool.query(`
            UPDATE Profiles 
            SET first_name = $1, last_name = $2, profile_picture_url = $3, bio = $4 
            WHERE user_id = $5`,
            [first_name, last_name, profile_picture_url, bio, decoded.user_id]);

        res.status(200).send('Profile updated successfully');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

exports.deleteUserProfile = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        await pool.query('DELETE FROM Profiles WHERE user_id = $1', [decoded.user_id]);

        await pool.query('DELETE FROM Users WHERE user_id = $1', [decoded.user_id]);

        res.status(200).send('User account deleted successfully');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await pool.query('SELECT * FROM Users');
        res.json(users.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

exports.adminDeleteUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        await pool.query('DELETE FROM Registrations WHERE user_id = $1', [userId]);

        await pool.query('DELETE FROM Profiles WHERE user_id = $1', [userId]);
        await pool.query('DELETE FROM Users WHERE user_id = $1', [userId]);

        res.status(200).send('User account deleted successfully');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};
