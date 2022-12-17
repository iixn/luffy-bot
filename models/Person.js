const { Schema } = require('mongoose')
const mongoose = require('mongoose')

const personIdSchema = new Schema({
    personId: {
        unique: true,
        type: String
    },
    personAge: Number,
    personRealName: String,
    experience: Number,
    estado: String
})

module.exports = mongoose.model('personId', personIdSchema)


