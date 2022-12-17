const { number } = require("mathjs");

module.exports = {
    
    getRandomInt: function (max) {
        
        return Math.floor(Math.random() * max);
    
    },
    isChatGroup: function (chat) {

        if (!chat.isGroup) chat.sendMessage("*_ERROR : este comando sólo puede usarse en grupos_*");
        return chat.isGroup;

    },
    shuffle: function (array) {
        
        array.sort(() => Math.random() - 0.5);
        return array;
    
    },

    // funny :)
    
    ball8: function (msg) {

        if ((msg.body.toLowerCase() == "!8ball")) {

            msg.reply(`*_ERROR : debes poner una pregunta_*\n\n*_Ejemplo : !8ball soy el mejor bot?_*`);
            return 0;

        }

        const answer = [
            "Sí!",
            "No ☹️",
            "Quizás....",
            "Probablemente",
            "Probablemente no",
            "Uhh, tengo hambre, voy a la cocina",
            "Todo apunta que si",
            "Todo apunta que no",
            "Claramente",
            "Pregunta difícil....",
            "Muy dudoso",
            "No muy dudoso",
            "Bueno"
        ]

        msg.reply(`*_Respuesta : ${answer[this.getRandomInt(12)]}_*`);

    },
    caracruz: function (msg) {

        switch (this.getRandomInt(2)) {
            case 0: msg.reply(`*_Bienvenido al juego de la moneda_*\n\n*_🪙 Ha salido... : Cara!_*`)
            case 1: msg.reply(`*_Bienvenido al juego de la moneda_*\n\n*_🪙 Ha salido... : Cruz!_*`)
        }

    },
    ship: async function(msg, chat, client) {

        if (this.isChatGroup(chat) == false) {
            return 0;
        }

        const author = await msg.getContact();
        let mentions = [];
        let participants = [];

        for (let participant of chat.participants) { 
            let contact = await client.getContactById(participant.id._serialized);
            participants.push(contact); 
        }

        this.shuffle(participants);

        mentions.push(author, participants[0]);
        
        chat.sendMessage(`*_Hey @${author.id.user},deberías casarte con @${participants[0].id.user} 💍_*`, { mentions });

    },
    top10: async function (name, chat, client) {

        if (this.isChatGroup(chat) == false) {
            return 0;
        }

        if (chat.participants.length < 10) {
            chat.sendMessage("*_ERROR : esto sólo se puede usar en grupos de más de 10 personas_*");
            return 0;
        }

        let text = "";
        let participants = [];
        let mentions = [];

        for (let participant of chat.participants) {

            participants.push(participant);

        }

        this.shuffle(participants);

        for (let i = 0; i < 10; i++) {
            mentions.push(participants[i]);
        }

        switch (name) {
            case 'gays': text = "*_🏳️‍🌈 Estos son los 10 más gays del grupo:_*\n\n╔═══\n"; break
            case 'lesbianas': text = "*_🏳️‍🌈 Estas son las 10 más lesbianas del grupo:_*\n\n╔═══\n"; break
            case 'tontos': text = "*_🥴 Estos son los 10 más tontos del grupo:_*\n\n╔═══\n"; break
        }

        for (let i in mentions) {
            text += `╠ *_@${await mentions[i].id.user}_*\n`
        }

        text += "╚═══"

        chat.sendMessage(text, { mentions })

    },
    random: async function(msg, chat, client) {

        if ((msg.body.toLowerCase() == "!random")) {
            msg.reply("*_ERROR : uso : !random verbo_*")
            return 0;
        }

        if (this.isChatGroup(chat) == false) {
            return 0;            
        }

        const author = await msg.getContact();
        let mentions = [];
        let participants = [];

        for (let participant of chat.participants) {
            let contact = await client.getContactById(participant.id._serialized);
            participants.push(contact);
        }

        while (participants[0].id.user == author.id.user) {
            this.shuffle(participants)
        } 

        mentions.push(author, participants[0]);

        chat.sendMessage(`*_@${author.id.user}, el elegido es : @${participants[0].id.user} 😱_*`, { mentions });

    },
    dado: function(msg) {

        msg.reply(`*_Bienvenido al juego del dado 🎲_*\n\n*_El número que ha salido es..._*\n\n*_${this.getRandomInt(6)}!_*`)   

    },
    ppt: function(msg, chat) {

        if ((msg.body.toLowerCase() === "!ppt")) {
            msg.reply("*_ERROR : uso : !ppt opcion (piedra,papel o tijera)_*")
            return 0;
        }

        let n;
        const opcion = msg.body.slice(5);

        switch ((opcion.toLowerCase())) {
            case 'piedra': n = 1; break
            case 'papel': n = 2; break
            case 'tijera': n = 3; break
            default: msg.reply(`*_Intenta alguna de estas opciones :_*\n\n*_◆ Piedra_*\n*_◆ Papel_*\n*_◆ Tijera_*`); break
        }

        if (this.getRandomInt(3) > n && n === 1) {

            chat.sendMessage(`*_◆ Tu : piedra_*\n*_◆ Bot : papel_*\n\n*_Has perdido 😿..._*`)

        } else if (this.getRandomInt(3) > n && n === 2) {

            chat.sendMessage(`*_◆ Tu : papel_*\n*_◆ Bot : tijera_*\n\n*_Has perdido 😿..._*`)

        } else if (this.getRandomInt(3) < n && n === 2) {

            chat.sendMessage(`*_◆ Tu : papel_*\n*_◆ Bot : piedra_*\n\n*_Has ganado 😸_*`)

        } else if (this.getRandomInt(3) < n && n === 3) {

            chat.sendMessage(`*_◆ Tu : tijera_*\n*_◆ Bot : papel_*\n\n*_Has ganado 😸_*`)

        } else if (this.getRandomInt(3) === n) {

            chat.sendMessage(`*_Empate 😱_*`);

        }
    },
    whatIs: async function(msg, chat, name) {
        
        if (this.isChatGroup(chat) === false) { return 0 }
        
        if ((msg.body.toLowerCase() === `!${name}`)) {

            msg.reply(`*_ERROR : uso : !${name} @persona_*`);
            return 0;
        
        }

        const person = await msg.getMentions();
        let mentions = [];

        if (person.length > 1) {
            
            msg.reply("*_ERROR : mencionar sólo a una persona_*");
            return 0;

        }

        for (let men of person) {

            mentions.push(men);
            let n = this.getRandomInt(100);

            switch (name) {
                case 'gay': n <= 50 ? chat.sendMessage(`*_@${men.id.user} es ${n}% gay 😮‍💨🏳️‍🌈_*`, { mentions }) : chat.sendMessage(`*_@${men.id.user} es ${n}% gay 😰🏳️‍🌈_*`, { mentions }); break
                case 'nigga': n <= 50 ? chat.sendMessage(`*_@${men.id.user} es ${n}% nigga 😮‍💨🙋🏾‍♂️_*`, { mentions }) : chat.sendMessage(`*_@${men.id.user} es ${n}% nigga 😰🙋🏾‍♂️_*`, { mentions })
            }
            

        }

    },
    love: async function(msg, chat) {

        if (this.isChatGroup(chat) === false) { return 0 }

        if ((msg.body.toLowerCase() === "!love")) {
            
            chat.sendMessage("*_ERROR : uso : !love @persona_*");
            return 0;

        }

        const mention = await msg.getMentions();
        const author = await msg.getContact();
        let mentions = [];
        mentions.push(author);

        for (let person of mention) {

            mentions.push(person);

        }

        if (mentions.length > 2) {

            msg.reply("*_ERROR : sólo se puede mencionar a una persona_*");
        
        }

        let n = this.getRandomInt(100);

        n <= 50 ? chat.sendMessage(`*_@${author.id.user} tu % de amor con @${mentions[1].id.user} es de ${n}%💞_*\n\n*_¿Crees que deberías casarte con esa persona?_*\n*_Yo no lo creo 😓💔_*`, { mentions }) : chat.sendMessage(`*_@${author.id.user} tu % de amor con @${mentions[1].id.user} es de ${n}%💞_*\n\n*_¿Crees que deberías casarte con esa persona?_*\n*_Yo si lo creo 🤭❤️‍🔥_*`, { mentions })
    }
}