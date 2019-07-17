const mongoose     = require('mongoose');
const Conversation = require('../models/conversation');
const Message      = require('../models/message');

/**
 * Finds conversation by participants, creates a new one if there is not
 * @param {Object} participants
 */
const getConversation = async (participants) => {
    let conversation = await Conversation.findOne({
        participants: { "$all": participants }
    });

    if (conversation.participants) {
        // For messaging to your own account
        participants.sort();
        conversation.participants.sort();

        if (participants[0] === conversation.participants[0]
            && participants[1] === conversation.participants[1]) {
                return conversation;
            }
    }

    return await new Conversation({
        participants
    }).save();
};

module.exports = {
    getConversation
};