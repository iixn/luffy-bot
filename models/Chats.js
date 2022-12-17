const { Schema } = require('mongoose');
const mongoose = require('mongoose')

const chatIdSchema = new Schema({
    nameChat: {
        type: String,
        unique: true
    },
    nsfwMenu: {
        type: Boolean
    },
    welcome: {
        type: Boolean
    }
})

module.exports = mongoose.model('chatId', chatIdSchema)
