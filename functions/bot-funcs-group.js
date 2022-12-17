

module.exports = {

    everyone: async function(msg, chat, client) {

        let text = `*Hora de despertar dormilones!😃*\n\n ⃟ঔৣ͜͡ீ͜🐱 Número de personas: ${chat.participants.length}\n\n*┌──────*\n`;
        let mentions = [];

        for (let participant of chat.participants) {

            const contact = await client.getContactById(participant.id._serialized);
            mentions.push(contact);
            text += `*│* @${participant.id.user} \n`;

        }

        text += `*└──────*`

        await chat.sendMessage(text, { mentions })

    },
    hidetag: async function (msg, chat, client) {

        if ((msg.body.toLowerCase() === "!hidetag")) {

            chat.sendMessage("*_ERROR : uso : !hidetag texto_*");
            return 0;
        }

        let mentions = [];
        let text = msg.body.slice(9);

        for (let participant of chat.participants) {

            const contact = await client.getContactById(participant.id._serialized);
            mentions.push(contact);

        }

        chat.sendMessage(text, { mentions });

    },
    groupinfo: function(chat) {

        chat.sendMessage(`*_◆ Nombre : ${chat.name}_*\n*_◆ Descripción_* : ${chat.description}\n*_◆ Creado el : ${chat.createdAt.toString()}_*\n*_◆ Número de participantes : ${chat.participants.length}_*`)

    }
}