const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // Other event fields...
});

module.exports = mongoose.model('Event', eventSchema);