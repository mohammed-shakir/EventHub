const pool = require('../utils/database');

exports.addEvent = async (req, res) => {
    const { title, description, start_time, end_time, location, image_url } = req.body;
    const organizer_id = 1/* Extract the organizer's ID from the user's session or token */;
    const created_at = new Date(); // Set the current date and time

    try {
        const insertQuery = `INSERT INTO Events (organizer_id, title, description, start_time, end_time, location, image_url, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
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
