const mongoose = require('mongoose');

require('../db/connect');

const messageSchema = new mongoose.Schema({
    sender: {
        type: String,
        trim: true,
        minlength: 4,
        maxlength: 20,
        required: true
    },
    content: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 1000,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    conversationId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;