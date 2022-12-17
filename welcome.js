const { Schema, mongoose } = require('mongoose');
const { ConsoleMessage } = require('puppeteer');
const { MongoStore } = require('wwebjs-mongo');
const { update } = require('./models/Chats');
require('./connection');
const chatsId = require('./models/Chats');

async function searchChat(idChat) {

    const chatExist = await chatsId.findOne({
        nameChat: idChat
    })

    if (!(chatExist)) {
        return;
    }

    return true;

}

module.exports = {
    enableWelcome: async function (idChat, client) {

        const checkChat = searchChat(idChat);

        if (checkChat != true) {
            return;
        }

        const updateChat = await chatsId.findOneAndUpdate({nameChat: idChat,
            welcome: true 
        }).then(() => {
            client.sendMessage(`*Activado con éxito!✅*`)
            console.log(updateChat)
        })

    },
    disableWelcome: async function (idChat, client) {

        const checkChat = searchChat(idChat);

        if (checkChat != true) {
            return;
        }

        const updateChat = await chatsId.findOneAndUpdate({nameChat: idChat,
            welcome: false 
        }).then(() => {
            client.sendMessage(`*Desactivado con éxito!✅*`)
            console.log(updateChat)
        })

    }
}