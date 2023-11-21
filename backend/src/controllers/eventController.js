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
        let currentUserId = null;

        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            currentUserId = decoded.user_id;
        }

        let eventsQuery = `
            SELECT e.*, u.user_id as organizer_id, p.first_name, p.last_name
            FROM Events e
            JOIN Users u ON e.organizer_id = u.user_id
            JOIN Profiles p ON u.user_id = p.user_id`;

        if (currentUserId) {
            eventsQuery = `
                SELECT e.*, u.user_id as organizer_id, p.first_name, p.last_name,
                       EXISTS (SELECT 1 FROM Registrations WHERE user_id = $1 AND event_id = e.event_id) as is_user_registered
                FROM Events e
                JOIN Users u ON e.organizer_id = u.user_id
                JOIN Profiles p ON u.user_id = p.user_id`;
        }

        const events = currentUserId ? await pool.query(eventsQuery, [currentUserId]) : await pool.query(eventsQuery);
        res.json(events.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

exports.getEventById = async (req, res) => {
    const eventId = req.params.eventId;
    try {
        const eventQuery = `
            SELECT e.*, 
                   JSON_AGG(JSON_BUILD_OBJECT('user_id', u.user_id, 'first_name', p.first_name, 'last_name', p.last_name)) as registered_users
            FROM Events e
            LEFT JOIN Registrations r ON e.event_id = r.event_id
            LEFT JOIN Users u ON r.user_id = u.user_id
            LEFT JOIN Profiles p ON u.user_id = p.user_id
            WHERE e.event_id = $1
            GROUP BY e.event_id`;
        const eventResult = await pool.query(eventQuery, [eventId]);
        if (eventResult.rows.length === 0) {
            return res.status(404).send('Event not found');
        }
        res.json(eventResult.rows[0]);
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
