const mongoose = require('mongoose');

const idleHoursSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    shift: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('idleHours', idleHoursSchema);
