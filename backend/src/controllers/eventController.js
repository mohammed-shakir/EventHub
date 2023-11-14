const pool = require('../utils/database');
const jwt = require('jsonwebtoken');

exports.addEvent = async (req, res) => {
    const { title, description, start_time, end_time, location, image_url } = req.body;

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const organizer_id = decoded.user_id;
        const created_at = new Date();

        const insertQuery = `INSERT INTO Events 
            (organizer_id, title, description, start_time, end_time, location, image_url, created_at) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
        await pool.query(insertQuery, [organizer_id, title, description, start_time, end_time, location, image_url, created_at]);

        res.status(200).send('Event added successfully');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await pool.query('SELECT * FROM Events');
        res.json(events.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

exports.getEventById = async (req, res) => {
    const eventId = req.params.eventId;

    try {
        const eventQuery = 'SELECT * FROM Events WHERE event_id = $1';
        const eventResult = await pool.query(eventQuery, [eventId]);

        if (eventResult.rows.length === 0) {
            return res.status(404).send('Event not found');
        }

        const event = eventResult.rows[0];
        res.json(event);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};
