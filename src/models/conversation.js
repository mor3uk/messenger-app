const mongoose = require('mongoose');

require('../db/connect');

const conversationSchema = new mongoose.Schema({
    participants: {
        type: [String],
        required: true
    }
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;