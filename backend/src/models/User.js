const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    role: String, // 'regular', 'organizer', 'admin'
    // Other user fields...
});

module.exports = mongoose.model('User', userSchema);