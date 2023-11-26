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
        
        if (decoded.role !== 'Organizer' && decoded.role !== 'Admin') {
            return res.status(403).send('Unauthorized to create events');
        }
        
        await pool.query(insertQuery, [organizer_id, title, description, start_time, end_time, location, image_url, created_at]);

        res.status(200).send('Event added successfully');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

exports.getEvents = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.user_id;

        const eventsQuery = `
            SELECT e.*, 
                   CASE WHEN r.user_id IS NOT NULL THEN TRUE ELSE FALSE END as is_registered,
                   p.first_name || ' ' || p.last_name as organizer_name
            FROM Events e
            LEFT JOIN Registrations r ON e.event_id = r.event_id AND r.user_id = $1
            JOIN Users u ON e.organizer_id = u.user_id
            JOIN Profiles p ON u.user_id = p.user_id`;

        const events = await pool.query(eventsQuery, [userId]);
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

        const regUsersQuery = `
            SELECT u.user_id, p.first_name, p.last_name 
            FROM Registrations r 
            JOIN Users u ON r.user_id = u.user_id 
            JOIN Profiles p ON u.user_id = p.user_id
            WHERE r.event_id = $1
        `;
        const regUsersResult = await pool.query(regUsersQuery, [eventId]);
        const registeredUsers = regUsersResult.rows;

        res.json({ ...event, registeredUsers });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

exports.registerForEvent = async (req, res) => {
    const { eventId } = req.params;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    try {
        const checkReg = await pool.query('SELECT * FROM Registrations WHERE user_id = $1 AND event_id = $2', [decoded.user_id, eventId]);
        if (checkReg.rows.length > 0) {
            return res.status(400).send('Already registered for this event');
        }

        await pool.query('INSERT INTO Registrations (user_id, event_id) VALUES ($1, $2)', [decoded.user_id, eventId]);
        res.status(200).send('Registered successfully');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

exports.updateEvent = async (req, res) => {
    const { eventId } = req.params;
    const { title, description, start_time, end_time, location, image_url } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const eventQuery = 'SELECT * FROM Events WHERE event_id = $1';
    const eventResult = await pool.query(eventQuery, [eventId]);
    if (eventResult.rows.length === 0) {
        return res.status(404).send('Event not found');
    }

    const event = eventResult.rows[0];
    if (event.organizer_id !== decoded.user_id && decoded.role !== 'Admin') {
        return res.status(403).send('Unauthorized to update this event');
    }

    const updateQuery = `UPDATE Events SET title = $1, description = $2, start_time = $3, end_time = $4, location = $5, image_url = $6 WHERE event_id = $7`;
    await pool.query(updateQuery, [title, description, start_time, end_time, location, image_url, eventId]);
    res.status(200).send('Event updated successfully');
};

exports.deleteEvent = async (req, res) => {
    const { eventId } = req.params;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const eventQuery = 'SELECT * FROM Events WHERE event_id = $1';
    const eventResult = await pool.query(eventQuery, [eventId]);
    if (eventResult.rows.length === 0) {
        return res.status(404).send('Event not found');
    }

    const event = eventResult.rows[0];
    if (event.organizer_id !== decoded.user_id && decoded.role !== 'Admin') {
        return res.status(403).send('Unauthorized to delete this event');
    }

    const deleteQuery = 'DELETE FROM Events WHERE event_id = $1';
    await pool.query(deleteQuery, [eventId]);
    res.status(200).send('Event deleted successfully');
};

exports.adminDeleteEvent = async (req, res) => {
    const eventId = req.params.eventId;

    try {
        await pool.query('DELETE FROM Events WHERE event_id = $1', [eventId]);
        res.status(200).send('Event deleted successfully');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};