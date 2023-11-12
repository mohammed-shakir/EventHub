const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Define routes
app.use('/api/users', require('./src/routes/users'));
app.use('/api/events', require('./src/routes/events'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});