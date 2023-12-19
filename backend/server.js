const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_DOMAIN
}));

// Define routes
app.use('/api/users', require('./src/routes/users'));
app.use('/api/events', require('./src/routes/events'));
app.use('/api/categories', require('./src/routes/categories'));

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

module.exports = app;