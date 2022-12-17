require('../connection')
const { Schema, mongoose } = require('mongoose');
const { update } = require('../models/Chats');
const chatIds = require('../models/Chats')

module.exports = { 
    enableWelcome: async function (idChat, chat) {

        const check = await chatIds.findOne({ nameChat: idChat })

        if (check == null) {
            return;
        }

        const updateChat = await chatIds.findOneAndUpdate({nameChat: idChat,
            welcome: true
        })
        
        chat.sendMessage(`*_Activado con éxito!✅_*`);
        console.log(updateChat);
        return true;

    },

    disableWelcome: async function (idChat, chat) {

        const check = await chatIds.findOne({ nameChat: idChat })

        if (check == null) {
            return;
        }

        const updateChat = await chatIds.findOneAndUpdate({nameChat: idChat,
            welcome: false
        })
        
        chat.sendMessage(`*_Desactivado con éxito!✅_*`);
        console.log(updateChat);
        return false;

    }
}