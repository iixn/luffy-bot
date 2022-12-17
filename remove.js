
require('./connection')
const { remove } = require('./models/Chats');
const chat = require('./models/Chats')

async function removeId() {
    await chat.findByIdAndDelete("637a201d52d963fa079bf6f0");
}

removeId()
