const fs = require('fs');
const { LocalAuth, Client, GroupNotificationTypes, Events, MessageMedia, WAWebJS, GroupChat, List, ChatTypes } = require('whatsapp-web.js');
const puppeteer = require('puppeteer');
let qrcode = require('qrcode-terminal');
const { join } = require('path');
const { group, info } = require('console');
const axios = require("axios");
const { CLIENT_RENEG_LIMIT } = require('tls');
const { PerformanceNodeTiming } = require('perf_hooks');
const { decode } = require('punycode');
const media = require(`./media`);
const pokemon = require(`./Pokemon`);
const { Schema, mongoose } = require('mongoose');
const main = require('qrcode-terminal');
const SearchGoogle = require('google-searcher');
require('./connection');
const chatsId = require('./models/Chats');
const personId = require('./models/Person')
const ytdl = require('ytdl-core');
const { L, Q } = require('qrcode-terminal/vendor/QRCode/QRErrorCorrectLevel');
const opus = require('opus-media-recorder');
const { param } = require('express/lib/request');
const { contentType } = require('express/lib/response');
const { execPath, title } = require('process');
const { findOne, findOneAndUpdate } = require('./models/Chats');
const { EventEmitter } = require('stream');
const { text } = require('express');
const { lookup } = require('dns');
const math = require('mathjs');
const { typeOf, magneticConstantDependencies, number } = require('mathjs');
const ytld = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const audio = require('fluent-ffmpeg/lib/options/audio');
const res = require('express/lib/response');
const fsPromise = require('fs').promises;
const welcome = require('./functions/database');
const WwebjsSender = require("@deathabyss/wwebjs-sender");
const EventEmitter2 = require('node:events');
const commandTimezone = require('./timezone');
const funcs = require('./functions/bot-funcs-funny');
const botFuncsFunny = require('./functions/bot-funcs-funny');
const botFuncsSearch = require('./functions/bot-funcs-search');
const botFuncsConvert = require('./functions/bot-funcs-convert');
const botFuncsGroup = require('./functions/bot-funcs-group');
const moment = require('moment-timezone');
const { monthsShort } = require('moment-timezone');

const client = new Client({ 
    authStrategy: new LocalAuth(),
    puppeteer: { executablePath: '/usr/bin/google-chrome-stable' }, 
});


client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log("\n\n\n");
});

client.on('authenticated', (session) => {
    console.log("Authenticated!")
})

client.on('ready', () => {
    console.log("Ready!")
})

client.initialize();

// Save session values to the file upon successful auth
/*client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
        if (err) {
            console.error(err);
        }
    });
});*/


//-------------------------------------------------------------------------

const cooldown = {

    _lockedUsers: new Set(),
    lock(user) {

      this._lockedUsers.add(user);
      setTimeout(() => this._lockedUsers.delete(user), 20000);
    
    },
    useLock(user) {

        if (this._lockedUsers.has(user)) {

            return false;

        } else {

            this.lock(user);
            return true;

        }
    }
};

async function isUserAdmin(chat, msg) {
    
    const author = msg.author;
    const personWithThatId = chat.participants.find(contact => contact.id._serialized === author);

    if (personWithThatId) {
        
        const { isAdmin } = personWithThatId;

        if (!isAdmin) {

            msg.reply("Sólo los administradores pueden usarlo!");
            return false;

        }
    }
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
}

/*<--------------------------------------------------------CREATOR------------------------------------------------------------------>*/

client.on('message', async msg => {
    
    if (msg.body.startsWith("!Pokemon ")) {

        const chat = await msg.getChat();
        const data = msg.body.slice(9)
        pokemon.getInfo(data, chat);
        
    }
})

client.on('message', async msg => {
        
    
    if (msg.body.startsWith("!Pvp ")) {
        const mentionedParticipant = await msg.getMentions();
        const eventEmitter = new EventEmitter2();
        const chat = await msg.getChat();
        let mentions = [];
        const contact = await msg.getContact();
        mentions.push(contact);
        let set = []
        
        if (mentions.length > 2) {
            chat.sendMessage(`*_${contact.id.user} menciona sólo a una persona!_*`, { mentions });
            return;
        }

        for (let participant of mentionedParticipant) {
            mentions.push(participant);
            set.push(participant)
        }

        
        eventEmitter.on('start', () => {
            chat.sendMessage(`*_@${mentions[1].id.user} ATENCIÓN!!_*\n\n*_@${contact.id.user} TE HA RETADO A UN PVP!!_*\n\n*_¿¿ACEPTAR?? [!pvp s/!pvp n]_*`, { mentions })
        })

        eventEmitter.emit('start');

        if (msg.from === contact.id._serialized && (msg.body.toLowerCase() === "!pvp s") && set[0] && msg.id.remote === chat.id._serialized) {
            eventEmitter.emit('s')
        } else if (msg.from === contact.id._serialized && (msg.body.toLowerCase() === "!pvp n") && set[0] && msg.id.remote === chat.id._serialized) {
            eventEmitter.emit('n')
        } else {
            return;
        }

        eventEmitter.on('s', () => {
            chat.sendMessage('*_Aceptado!_*')
        })

        eventEmitter.on('n', () => {
            chat.sendMessage('*_Rechazado!_*');
        })
    }
})

/*<---------------------------------------------------- AUDIOS ----------------------------------------------------------------------->*/

client.on('message', async msg => {
    
    const chat = await msg.getChat();

    if ((msg.body.toLowerCase() === "manden porno")) {
        const media = MessageMedia.fromFilePath('./audiosmsg/mandenporno.mp3');
        chat.sendMessage(media, { sendAudioAsVoice: true });
    } else if ((msg.body.toLowerCase() === "uwu" || msg.body.toLowerCase() === "ugu" || msg.body.toLowerCase() === "uqu")) {
        const media = MessageMedia.fromFilePath('./audiosmsg/uwu.mp3');
        chat.sendMessage(media, { sendAudioAsVoice: true });
    } else if ((msg.body.startsWith("Ji") || msg.body.startsWith("JI") || msg.body.startsWith("ji") || msg.body.startsWith("jI")) && (msg.body.endsWith("ja") || msg.body.endsWith("jA") || msg.body.endsWith("Ja") || msg.body.endsWith("JA"))) {
        const media = MessageMedia.fromFilePath('./audiosmsg/jijijija.mp3');
        chat.sendMessage(media, { sendAudioAsVoice: true });
    }
})

/*<----------------------------------------------------FUNNY------------------------------------------------------------------------>*/

client.on('message', async msg => {
    
    const contactID = (await msg.getContact()).id._serialized;
    const chat = await msg.getChat();
    const commands = [
        "!everyone",
        "!hidetag",
        "!groupinfo"
    ]

    if (msg.body.startsWith("!")) {
        
        if (cooldown.useLock(contactID)) {

            if ((msg.body.toLowerCase() === "!menu")) {
                
                const contact = await msg.getContact();
                const media = MessageMedia.fromFilePath('./media/menu.png');
                let mentions = [];
                mentions.push(contact);

                chat.sendMessage(media , { caption: `*╭════ 〘 ✯✯✯✯✯✯ 〙 ════*
*║ _➣ Hey @${contact.id.user}!_*
*╠══════════════════*
*╠ _ʟʊʄʄʏ - ɮօȶ_*
*╠══════════════════*
*║ _➣ Creador del bot: Ian_*
*║ _➣ Número del creador:_*
*║ _Wa.me/+34671981875 (No Bot)_*
*║ _!audiomenu_*
*╰════ 〘 ✯✯✯✯✯✯ 〙 ════*
*╭════ 〘 ✯✯✯✯✯✯ 〙 ════*  
*╠ _ᳬ⃟🎮 !8ball pregunta_*
*╠ _ᳬ⃟🎮 !Say texto_*
*╠ _ᳬ⃟🎮 !CaraCruz_*
*╠ _ᳬ⃟🎮 !Dado_*
*╠ _ᳬ⃟🎮 !PPT opción_*
*╠ _ᳬ⃟🎮 !Ship_*
*╠ _ᳬ⃟🎮 !Love @persona_*
*╠ _ᳬ⃟🎮 !Random pregunta_*
*╠ _ᳬ⃟🎮 !Top10Gays_*
*╠ _ᳬ⃟🎮 !Top10Lesbianas_*
*╠ _ᳬ⃟🎮 !Top10Tontos_*
*╠ _ᳬ⃟🎮 !Gay @persona_*
*╠ _ᳬ⃟🎮 !Math operación_*
*╠ _ᳬ⃟🎮 !Pokemon pokemon_*
*╠══════════════════*
*╠ _ᳬ⃟👥 !Kiss @persona_*
*╠ _ᳬ⃟👥 !Hit @persona_*
*╠ _ᳬ⃟👥 !GMF @persona_*
*╠ _ᳬ⃟👥 !Hug @persona_*
*╠ _ᳬ⃟👥 !Fuck @persona_*
*╠ _ᳬ⃟👥 !Avatar_*
*╠ _ᳬ⃟🙂 !Status normal_*
*╠ _ᳬ⃟😔 !Status sad_*
*╠ _ᳬ⃟😋 !Status happy_*
*╠ _ᳬ⃟😠 !Status angry_*
*╠══════════════════*
*╠ _ᳬ⃟🔎 !SearchVideo video_*
*╠ _ᳬ⃟🔎 !Play canción_*
*╠ _ᳬ⃟🔎 !Ig tuIg_*
*╠ _ᳬ⃟🔎 !Tz_*
*╠ _ᳬ⃟🔎 !Tiempo ciudad_*
*╠══════════════════*
*╠ _ᳬ⃟🔧 !Chats_*
*╠ _ᳬ⃟🔧 !Ping_*
*╠══════════════════*
*╠ _ᳬ⃟📥 !Sticker_*
*╠ _ᳬ⃟📥 !Sti_*
*╠══════════════════*
*╠ _ᳬ⃟💾 !Reg name age_*
*╠ _ᳬ⃟💾 !UpdtReg name age_*
*╠ _ᳬ⃟💾 !Nsfw enable_*
*╠ _ᳬ⃟💾 !Nsfw disable_*
*╠ _ᳬ⃟💾 !RegChat_*
*╠══════════════════*
*╠ _ᳬ⃟ℹ️ !EveryOne_*
*╠ _ᳬ⃟ℹ️ !HideTag algo_*
*╠ _ᳬ⃟ℹ️ !GroupInfo_*
*╠ _ᳬ⃟ℹ️ !Kick @persona_*
*╠ _ᳬ⃟ℹ️ !Add number_*
*╠ _ᳬ⃟ℹ️ !Leave_*
*╠ _ᳬ⃟ℹ️ !Open_*
*╠ _ᳬ⃟ℹ️ !Close_*
*╠ _ᳬ⃟ℹ️ !EnableWelcome_*
*╠ _ᳬ⃟ℹ️ !DisableWelcome_*
*╰════ 〘 ✯✯✯✯✯✯ 〙 ════*

*_¿Quieres unir el bot a tu grupo?_*
*╭════ 〘 ✯✯✯✯✯✯ 〙 ════*  
*╠ _ᳬ⃟🤖 !Join https://chat...._*
*╰════ 〘 ✯✯✯✯✯✯ 〙 ════*

*_¿Quieres aportar ideas al bot?_*
*_¡Habla a mi creador para_*
*_unirte a un grupo de_*
*_whatsapp!_*` })                

            } else if ((msg.body.toLowerCase() === "!audiomenu")) {      
    
                const contact = await msg.getContact();
                let mentions = [];
                mentions.push(contact);

                chat.sendMessage(`*_ツ💞 Hola @${contact.id.user}! 💞ツ_*
        
*_✯Menú de audios✯_*
                                                                  
*_Escribe las palabras tal cual,pueden estar en mayúscula y minúscula y no hace falta poner ningún prefijo (!)_*
                                                                  
 ᳬ⃟🔊  *_manden porno_*
 ᳬ⃟🔊  *_uwu_*
 ᳬ⃟🔊  *_jijijijija_*
                                                                  
*_⎝© luffy - bot⎞_*`, { mentions })
    
            // <--- <> ¡Funny! <>  --->
            
            } else if ((msg.body.toLowerCase().startsWith("!8ball"))) {
    
                botFuncsFunny.ball8(msg)    
                
            } else if ((msg.body.toLowerCase().startsWith("!say"))) {
        
                const text = msg.body.slice(5);
                msg.reply(`*_Texto : ${text}._*`);
        
            } else if ((msg.body.toLowerCase() === "!caracruz")) {
        
                botFuncsFunny.caracruz(msg);
        
            } else if ((msg.body.toLowerCase() === "!ship")) {
        
                botFuncsFunny.ship(msg, chat, client);
        
            } else if ((msg.body.toLowerCase() === "!top10gays")) {
        
                botFuncsFunny.top10('gays', chat, client);    
        
            } else if ((msg.body.toLowerCase() === "!top10lesbianas")) {
                    
                botFuncsFunny.top10('lesbianas', chat, client);
        
            } else if ((msg.body.toLowerCase() === "!top10tontos")) {
        
                botFuncsFunny.top10('tontos', chat, client);
        
            } else if ((msg.body.toLowerCase().startsWith("!random"))) {
        
                botFuncsFunny.random(msg, chat, client);
                
            } else if ((msg.body.toLowerCase() == "!dado")) {
        
                botFuncsFunny.dado(msg);
        
            } else if ((msg.body.toLowerCase().startsWith("!ppt"))) {
    
                botFuncsFunny.ppt(msg, chat);    
        
            } else if ((msg.body.toLowerCase().startsWith("!gay"))) {
        
                botFuncsFunny.whatIs(msg, chat, 'gay');
        
            } else if ((msg.body.toLowerCase().startsWith("!nigga"))) {
        
                botFuncsFunny.whatIs(msg, chat, 'nigga');
    
            } else if ((msg.body.toLowerCase().startsWith("!love"))) {
                
                botFuncsFunny.love(msg, chat);
    
            // <--- Search 0_0 --->
    
            } else if ((msg.body.toLowerCase() === "!tz")) {
    
                botFuncsSearch.tz(chat);
    
            } else if ((msg.body.toLowerCase().startsWith("!searchvideo"))) {

                botFuncsSearch.searchVideo(msg, chat)

            } else if ((msg.body.toLowerCase().startsWith("!ig"))) {

                botFuncsSearch.ig(msg, chat);

            } else if((msg.body.toLowerCase().startsWith("!tiempo"))) {

                botFuncsSearch.tiempo(msg, chat)

            // <--- Useful 🔧 --->

            } else if ((msg.body.toLowerCase() === "!ping")) {

                const latency = ((Date.now() - (msg.timestamp * 1000)) / 1000).toFixed(2)
                chat.sendMessage(`*_📶 Latencia del Bot : ${latency} ms_*`)

            } else if ((msg.body.toLowerCase() === "!chats")) {

                chat.sendMessage(`*_El bot tiene ${(await client.getChats()).length} chats abiertos 💬_*`);
                
            // <--- Convert ♻️ --->

            } else if ((msg.body.toLowerCase() === "!sticker")) {

                botFuncsConvert.sticker(msg, chat);

            } else if ((msg.body.toLowerCase() === "!sti") && msg.hasQuotedMsg === true) {

                botFuncsConvert.sti(chat, msg);

            } else if (commands.includes((msg.body.toLowerCase().split(' ')[0])) === true) {

                if (!(chat.isGroup)) {

                    chat.sendMessage("*_ERROR : este comando sólo se puede usar en grupos_*");
                    return 0;

                }

                for (let participant of chat.participants) {

                    if (msg.author == participant.id._serialized && !participant.isAdmin) {
        
                        chat.sendMessage("*_ERROR : este comando sólo lo pueden usar administradores_*");
                        return 0;
        
                    }
        
                }
                // оригінальний звук
                if ((msg.body.toLowerCase() === "!everyone")) {

                    botFuncsGroup.everyone(msg, chat, client);

                } else if ((msg.body.toLowerCase().startsWith("!hidetag"))) {

                    botFuncsGroup.hidetag(msg, chat, client);

                } else if ((msg.body.toLowerCase() === "!groupinfo")) {

                    botFuncsGroup.groupinfo(chat);

                }

            }

        } else {
    
            chat.sendMessage("*_¡Espera 20s antes de volver a usar un comando! 🔰_*")
    
        }
                
        
    }
})

/*<---------------------------------------------------MEDIA----------------------------------------------------------------------->*/

client.on('message', async msg => {

    if (msg.body === "!Avatar" || msg.body === "!avatar") {

        const contactID = (await msg.getContact()).id._serialized;
        const chat = await msg.getChat();

        if (cooldown.useLock(contactID)) {

            const number = (await msg.getContact()).id.user;
            let idPerson = await personId.findOne({personId: number})
        
            if (idPerson == null) {

                msg.reply("*⚠️ ERROR [★]*\n\n*No estás registrado,tienes que registrarte usando el siguiente comando :*\n\n*!Reg tuNombre tuEdad*\n\n*Ejemplo: !Reg Ian 15*")
            
            } else {
                
                const contact = await msg.getContact();
                const age = idPerson.personAge;
                const realName = idPerson.personRealName;
                //debugger
                const experience = idPerson.experience;
                let status = idPerson.estado;

                let foto = await client.getProfilePicUrl(contact.id._serialized);
                let bio = await contact.getAbout();
                let name = contact.pushname

                if (bio == null) {
                    bio = ""
                }

                if (name == undefined) {
                    name = ""
                }

                if (status == null || status == undefined) {
                    status = "normal"
                }

                if (foto === undefined) {

                    await chat.sendMessage(`*★ Nombre :* ${name}\n
*★ Nombre real : ${realName}*\n
*★ Edad : ${age}*\n
*★ Número : @${contact.id.user}*\n
*★ Experiencia : ${experience}*\n
*★ Estado : ${status}*\n
*★ Biografía :* ` + bio)

                } else {

                    const media = await MessageMedia.fromUrl(foto);
                    await chat.sendMessage(media, { caption: `*★ Nombre :* ${name}\n
*★ Nombre real : ${realName}*\n
*★ Edad : ${age}*\n
*★ Número : @${contact.id.user}*\n
*★ Experiencia : ${experience}*\n
*★ Estado : ${status}*\n
*★ Biografía :* ` + bio});

                }

            }

        } else {

            msg.reply("*Espera 20 segundos para poder usar un comando*")

        }

    } else if (msg.body.startsWith("!AvatarOf ")) {

        const contactID = (await msg.getContact()).id._serialized;

        if (cooldown.useLock(contactID)) {

            const mentions = await msg.getMentions();
            const chat = await msg.getChat();

            for (let contact of mentions) {

                let name = contact.pushname
                let foto = await client.getProfilePicUrl(contact.id._serialized);
                let bio = await contact.getAbout();
                

                if (bio == null) {
                    bio = "";
                }

                if (name == undefined) {
                    name = ""
                }

                //if ()


                if (foto === undefined) {

                await chat.sendMessage(`*Nombre : ${name}*
*Número : @${contact.id.user}*
*Biografía :* ` + bio);

                } else {

                    const media = await MessageMedia.fromUrl(foto);
                    await chat.sendMessage(media, { caption: `*Nombre : ${contact.pushname}*
*Número : @${contact.id.user}*
*Biografía :* ` + bio});

                }
            }

        } else {

            msg.reply("*Espera 20 segundos para poder usar un comando*")

        }
    }
    
})
// PRUEBAS 2

client.on('message', async msg => {
    const chat = await msg.getChat();
    
    if ((msg.body.toLocaleLowerCase() === "!help sti")) {
            
        const helpSti = MessageMedia.fromFilePath('./help/help_sti.jpeg');

        chat.sendMessage(helpSti, { caption: `*Para transformar un sticker a una imágen fíjate en el ejemplo de la foto*\n\n*⚠️ NOTA!*\n\n*El bot no manda stickers animados,sólo manda una imágen*` });
    } else if (msg.body === "!Help Sticker" || msg.body === "!help sticker" || msg.body === "!help stiker" || msg.body === "!Help Stiker") {

        const helpSticker = MessageMedia.fromFilePath('./help/help_sticker.jpeg');
        chat.sendMessage(helpSticker, { caption: `*Para crear un sticker sólo tienes que mandar una imágen y en el pie de foto poner "!Sticker" sin comillas*\n\n*⚠️ NOTA!*\n\n*Si es un vídeo largo (15 segundos por ejemplo) el bot no mandará un sticker tan largo*` })

    } else if (msg.body === "!Help Reg" || msg.body === "!help reg") {

        const helpReg = MessageMedia.fromFilePath('./help/help_reg.jpeg');
        chat.sendMessage(helpReg, { caption: `*Para registrarte sólo tienes que hacer como el ejemplo pero sustituyendo Ian por tu nombre y 15 por tu edad*\n\n*A mí me da error porque ya estoy registrado XD*` })

    } else if (msg.body === "!Help" || msg.body === "!help") {

        msg.reply(`*Bienvenid@ al menú de ayuda del bot 😺*\n
*┌*   ⃟ঔৣ͜͡ீ͜🐱 !Help Sti
*│*   ⃟ঔৣ͜͡ீ͜🐱 !Help Reg
*└*   ⃟ঔৣ͜͡ீ͜🐱 !Help Sticker`)

    }
})

/*<----------------------------------------------INTERACTUATION-------------------------------------------------------------------->*/

client.on('message', async msg => {

    if (msg.body.startsWith("!Kiss ") || msg.body.startsWith("!kiss ")) {

        media.mediapeople(client, msg, MessageMedia, "5", "kiss")

    } else if (msg.body.startsWith("!Hit ") || msg.body.startsWith("!hit ")) {

        media.mediapeople(client, msg, MessageMedia, "5", "hit")

    } else if (msg.body.startsWith("!GMF ") || msg.body.startsWith("!gmf ")) {

        media.mediapeople(client, msg, MessageMedia, "4", "givemefive")

    } else if (msg.body.startsWith("!Hug ") || msg.body.startsWith("!hug ")) {

        media.mediapeople(client, msg, MessageMedia, "3", "hug")

    } else if (msg.body == "!Status angry" || msg.body === "!status angry") {

        media.angry(client, msg, MessageMedia, "2", "angry")

    } else if (msg.body == "!Status normal" || msg.body === "!status normal") {

        media.normal(client, msg, MessageMedia, "3", "normal")

    } else if (msg.body == "!Status sad" || msg.body === "!status sad") {

        media.sad(client, msg, MessageMedia, "2", "sad")

    } else if (msg.body == "!Status happy" || msg.body === "!status happy") {

        media.happy(client, msg, MessageMedia, "2", "happy")

    }
})

/*<--------------------------------------------------GROUP----------------------------------------------------------------------->*/


/*client.on('message', async (msg) => {
    const chat = await msg.getChat();
    const contact = await msg.getContact();
    
    await chat.sendMessage(`Hello @${contact.id.user}`, {
        mentions: [contact]
    });
});*/

client.on('message', async msg => {

    if (msg.body.startsWith("!Kick ") || msg.body.startsWith("!kick ")) {

        const contactID = (await msg.getContact()).id._serialized;

        if (cooldown.useLock(contactID)) {

            const chatId = msg.id.remote;
            const chat = await msg.getChat();
            const author = msg.author;
            const personWithThatId = chat.participants.find(contact => contact.id._serialized === author);

            if (personWithThatId) {
                const { isAdmin } = personWithThatId;

                if (!isAdmin) {

                    msg.reply("Sólo los administradores pueden usarlo!");
                    return;

                }
            }
            
            const mentions = await msg.getMentions();

            client.getChatById(chatId).then(async chat => {
            
                for (let id of mentions) await chat.removeParticipants([id.id._serialized]);
            
            })

            //await chat.removeParticipants(mentions.map(contact => contact.id));
            

        } else {

            msg.reply("*Espera 20 segundos para poder usar un comando*")

        }

    } else if (msg.body.startsWith("!Join ") || msg.body.startsWith("!join ")) {

        const contactID = (await msg.getContact()).id._serialized;

        if (cooldown.useLock(contactID)) {

            const link = msg.body.slice(6)
            let inviteCode = link.replace('https://chat.whatsapp.com/', '')

            client.acceptInvite(inviteCode).catch(err => {
            
                msg.reply("*Enlace inválido!!*")

            })

        } else {

            msg.reply("*Espera 20 segundos para poder usar un comando*")

        }

    } else if (msg.body == "!Leave" || msg.body === "!leave") {
        
        const contactID = (await msg.getContact()).id._serialized;

        if (cooldown.useLock(contactID)) {

            const chat = await msg.getChat();

            if (chat.isGroup) {

                chat.leave()

            } else {

                msg.reply("Esto sólo se puede usar en grupos!!")

            }

        } else {

            msg.reply("*Espera 20 segundos para poder usar un comando*")

        }

    } else if (msg.body == "!GroupLink") {

        const contactId = (await msg.getContact()).id._serialized;
        const chat = await msg.getChat();
        const authorId = msg.author;

        if (cooldown.useLock(contactId)) {

            if (!chat.isGroup) {

                msg.reply("*Ésto sólo se puede usar en grupos!*")

            } else {

                for (let participant of chat.participants) {

                    if (participant.id._serialized === authorId && !participant.isAdmin) {

                        msg.reply("Esto sólo lo pueden usar administradores!");
        	    
                    } else {

                        const code = await chat.getInviteCode().catch(err => {

                            if (err) {

                                msg.reply("*Necesito ser administrador!*")
                                return;

                            } else {

                                msg.reply(code)

                            }

                        })

                    }

                }

            }

        } else {

            msg.reply("*Espera 20 segundos para poder usar un comando*")

        }

    } else if ((msg.body.toLowerCase() === "!close")) {

        const chat = await msg.getChat();
        await chat.setMessagesAdminsOnly(true);
        

    } else if ((msg.body.toLowerCase() === "!open")) {

        const chat = await msg.getChat();
        await chat.setMessagesAdminsOnly(false);

    } else if (msg.body.startsWith("!SetDesc ") || msg.body.startsWith("!setdesc ")) {

        const description = msg.body.slice(9);
        const chat = await msg.getChat();
        const authorId = msg.author;

        if (!chat.isGroup) {

            msg.reply("*Esto sólo se puede usar en grupos!*");
        
        } else {

            for (let participant of chat.participants) {

                if (participant.id._serialized === authorId && !participant.isAdmin) {

                    msg.reply("Esto sólo lo pueden usar administradores!");
                    return;
            
                } else {

                    chat.setDescription(description);

                }

            }

        }
    } else if (msg.body.startsWith("!Add ")) {

        let check = msg.body.split(' ')

        if ((check[0].toLocaleLowerCase() === "!add")) {
            
            const chat = await msg.getChat()
            
            const isAdmin = await isUserAdmin(chat, msg)
            console.log(isAdmin)
            if (isAdmin === false) {
                return;
            }

            try {

                const number = msg.body.slice(5)

                if (!chat.isGroup) {
                    msg.reply("Esto sólo se puede usar en grupos!")
                    return
                }

                await chat.addParticipants([`${number}@c.us`]);

            } catch (err) {

                msg.reply(`*_No se ha podido añadir al contacto!_*

*_Asegúrate de que hayas escrito bien el número_*
*_Quita el "+",los paréntesis,escribe junto..._*

*_Ejemplo:_*

*_!Add +1 (415) 329-9979 ❌_*
*_!Add 14153299979 ✅_*`)

            }
        }
        
    }
});

client.on('message', async m => {
    if (m.body == "!cont") {
        const contact = await m.getContact()
        console.log(contact)
    } else if (m.body.startsWith("!CONT ")) {
        const mentions = await m.getMentions()
        for (let contact of mentions) {
            console.log(contact)
        }
    }
})

/*<------------------------------------------------------------Admin---------------------------------------------------------------->*/



/*<---------------------------------------------------EVENTS----------------------------------------------------------------->*/

client.on('message', async msg => {

    if ((msg.body.toLowerCase() === "!enablewelcome")) {

        const idChat = msg.id.remote;
        const chat = await msg.getChat()
        welcome.enableWelcome(idChat, chat)
        

    } else if ((msg.body.toLowerCase() === "!disablewelcome")) {

        const chat = await msg.getChat()
        const idChat = msg.id.remote;
        welcome.disableWelcome(idChat, chat)

    }

})

client.on('group_join', async (notification) => {

    const chat = await notification.getChat();
    const idChat = (await notification.getChat()).id._serialized;
    const check = await chatsId.findOne({ nameChat: idChat })
    console.log(idChat)

    if (check.welcome == false) {
        return;
    }

    const person = await notification.getRecipients();
    let nameGroup = chat.name
    let mentions = []

    if (nameGroup == undefined) {

        nameGroup = ""

    }

    for (let contact of person) {

        mentions.push(contact);
        
        let foto = await client.getProfilePicUrl(contact.id._serialized);
        let message = `*╔══ 〘 ✞Bienvenido!✞ 〙 ═══*
*╠══════════════════*
*║* ➣ Hey @${contact.id.user}!
*╠══════════════════*
*║*
*║ Este es el grupo :*
*║* ${chat.name}
*║*
*║ Espero que lo disfrutes 😁*
*║*
*║  Usa "!Menu" para ver mis*
*║  comandos!*
*║*
*║  Y no olvides leer la*
*║  descripción!!*
*║*
*╚══════════════════*`

        if (foto == undefined) {

             chat.sendMessage(message, { mentions })

        } else {

            const media = await MessageMedia.fromUrl(foto);
            await chat.sendMessage(media, { caption: `${message}`, mentions });

        }
    }
});

client.on('group_leave', async (notification) => {

    const idChat = (await notification.getChat()).id._serialized
    const chat = await notification.getChat();
    const check = await chatsId.findOne({ nameChat: idChat })
    console.log(idChat)

    if (check.welcome == false) {
        return;
    }

    const person = await notification.getRecipients();
    let mentions = [];

    for (let contact of person) {

        mentions.push(contact);

        let foto = await client.getProfilePicUrl(contact.id._serialized);
        let message = `*╔══ 〘 ✞ Vayaaa D: ✞ 〙 ═══*
*╠══════════════════*
*║* @${contact.id.user} se fue 😔!
*╠══════════════════*
*║*
*║ Pero no se disgusten,*
*║ Yo tampoco sé quién es...🐴*
*║*
*╚══════════════════*`

        if (foto === undefined) {

            chat.sendMessage(message, { mentions })

        } else {

            const media = await MessageMedia.fromUrl(foto);
            await chat.sendMessage(media, { caption: `${message}`, mentions });  

        }
    }
});






// -------------------------------- pruebas -------------------------


client.on('message', async msg => {

    if (msg.body.startsWith("!Reg ") || msg.body.startsWith("!reg ")) {

        const number = (await msg.getContact()).id.user;

        const message = msg.body.slice(5)
        const [name, s_age] = message.split(' ');
        const age = isNaN(s_age)

        if (age == false) {

            console.log({ name, age });
            const findNumber = await personId.findOne({personId: number})

            if (findNumber == null) {
    
                const addPerson = await personId.create({personId: number,
                    personAge: s_age,
                    personRealName: name
                })
                    
                await addPerson.save()
                    .then(() => msg.reply("*Registrado correctamente! ✅*"))
                    .catch(err => msg.reply("*⚠️ ERROR [★]*\n\n*No te has podido registrar*"))

            } else {
    
                msg.reply("*⚠️ ERROR [★]*\n\n*Ya estás registrado*");
            
            }

        } else {
            
            msg.reply("*⚠️ ERROR [★]*\n\n*No te has podido registrar*")

        } 

    } else if (msg.body.startsWith("!UpdtReg ") || msg.body.startsWith("!updtreg ")) {

        const number = (await msg.getContact()).id.user;
        const message = msg.body.slice(9);
        const [name, s_age] = message.split(' ');
        const age = isNaN(s_age);

        if (age == false) {

            const findNumber = await personId.findOne({personId: number})
            const lastExperience = findNumber.experience;
            const lastStatus = findNumber.estado;

            if (findNumber == null) {

                msg.reply("*⚠️ ERROR [★]*\n\n*No estás registrado,tienes que registrarte usando el siguiente comando :*\n\n*!Register tuNombre tuEdad*\n\n*Ejemplo: !Register Ian 15*")
    
            } else {
    
                const updatedName = await personId.findOneAndUpdate({personId: number},
                    {
                        personRealName: name,
                        personAge: s_age,
                        experience: lastExperience,
                        estado: lastStatus
                    }
                )
                    .then(msg.reply("*Actualizado con éxito!✅*"))
                    .catch(err => msg.reply("*⚠️ ERROR [★]*\n\n*No te has podido actualizar*"))

            }

        } else {

            msg.reply("*⚠️ ERROR [★]*\n\n*No te has podido registrar*")

        }

    } else if (msg.body == "!DelReg") {

        const number = msg.author;
        const findUser = await personId.findOne({personId: number})
        console.log(findUser)

        if (findUser == false) {

            msg.reply("*⚠️ ERROR [★]*\n\n*No te has podido eliminar*")

        } else {

            const delUser = await personId.findOneAndDelete({personId: number})
                .then(msg.reply("*Eliminado con éxito!✅*"))
                .catch(err => msg.reply("*⚠️ ERROR [★]*\n\n*No te has podido eliminar*"))

            console.log(delUser)

        }
                
    }
})

client.on("message", async msg => {
    if (msg.body == "!Tomas") {
        const chat = await msg.getChat()
        const file = MessageMedia.fromFilePath('./images/Tomas.jpeg');
        chat.sendMessage(file, { caption: `Alto sexy negro de 3 metros con tremendo pene ademas de sexy` })
    }
})

client.on('message', async msg => {

    if (msg.body.startsWith("!Play ") || msg.body.startsWith("!play ")) {

        /*const contactID = (await msg.getContact()).id._serialized;

        if (cooldown.useLock(contactID)) {
            

            const data = msg.body.slice(6);
            const chat = await msg.getChat();
    
            async function start() {
        
                const youtube = await new Innertube();
                
                try {

                    const search = await youtube.search(data);

                    try {
                        const video = await search.videos[0].id
                        const link = `https://www.youtube.com/watch?v=${video}`;
                    
                        const stream = ytdl(link, {
                            quality: "highestaudio",
                    
                        })

                        console.log(stream)

                        ffmpeg(stream)
                            .audioBitrate(128)
                            .save(`/home/iixn/zxki-whatsapp/zxki/audio/${contactID}.mp3`)
                            .on('end', async () => {
                        
                                let chat = await msg.getChat();
                                let media = MessageMedia.fromFilePath(`/home/iixn/zxki/audio/${contactID}.mp3`)
                        
                                chat.sendMessage(`*Disfruta de tu canción!😁*\n\n*Canción:* ${search.videos[0].title}`)
                                chat.sendMessage(media, { sendAudioAsVoice: true })
                    
                            })

                    } catch (err) {

                        msg.reply(`*_No se ha podido descargar tu canción!_*\n*_Inténtalo más tarde!_*`)

                    }

                } catch (err) {
                    
                    msg.reply(`*_No se ha podido descargar tu canción!_*\n\n*_Inténtalo más tarde!_*`);
                    return;
                }
                        
                if (!(fs.existsSync(media))) {
                            
                    return;
                        
                }
                            
                fsPromise.unlink(`/home/iixn/zxki/audio/${contactID}.mp3`);

            }

            start();

        } else {

            msg.reply("*Espera 20 segundos para poder usar un comando*")

        }*/

        msg.reply("Actualmente desactivado")

        
    }

})

client.on('message', async msg => {
    if (msg.body == "!ñ") {
        const chat = await msg.getChat();
        console.log(chat);
    }
})

client.on('message', async msg => {
    if (msg.body === "!Nsfw enable" || msg.body === "!nsfw enable") {

        const chatId = msg.id.remote;
        const chat = await msg.getChat();
        const author = msg.author;
        const personWithThatId = chat.participants.find(contact => contact.id._serialized === author);

        if (personWithThatId) {

            const { isAdmin } = personWithThatId;

            if (!isAdmin) {

                msg.reply("Sólo los administradores pueden usarlo!");
                return;
            
            }
        }

        const findChat = chatsId.findOne({nameChat: chatId})

        if (findChat === null || findChat === undefined) {

            msg.reply("*⚠️ ERROR [★]*\n\n*El chat no está registrado! Regístralo usando el siguiente comando:*\n\n*!RegChat*")
            return;

        }

        const updatedChat = await chatsId.findOneAndUpdate({nameChat: chatId},{
            nsfwMenu: true
        })
            .then(msg.reply("Activado correctamente!✅"))
            .catch(err => msg.reply(`*⚠️ ERROR [★]*\n\nNo has podido activarlo`))

        console.log(updatedChat);

    } else if (msg.body === "!Nsfw disable" || msg.body === "!nsfw disable") {

        const chatId = msg.id.remote;
        const chat = await msg.getChat();
        const author = msg.author;
        const personWithThatId = chat.participants.find(contact => contact.id._serialized === author);

        if (personWithThatId) {

            const { isAdmin } = personWithThatId;

            if (!isAdmin) {

                msg.reply("Sólo los administradores pueden usarlo!");
                return;
            
            }
        }

        const findChat = chatsId.findOne({nameChat: chatId})

        if (findChat === null || findChat === undefined) {

            msg.reply("*⚠️ ERROR [★]*\n\n*El chat no está registrado! Regístralo usando el siguiente comando:*\n\n*!RegChat*")
            return;

        }

        const updatedChat = await chatsId.findOneAndUpdate({nameChat: chatId},{
            nsfwMenu: false
        })
            .then(msg.reply("Desactivado correctamente!✅"))
            .catch(err => msg.reply(`*⚠️ ERROR [★]*\n\nNo has podido desactivarlo`))

        console.log(updatedChat);

    } else if (msg.body === "!RegChat" || msg.body === "!regchat") {

        const chatId = msg.id.remote;
        const findChat = await chatsId.findOne({nameChat: chatId})

        if (findChat != null) {

            msg.reply("*⚠️ ERROR [★]*\n\n*El chat ya está registrado!*");
            return;

        }
        
        const newChat = await chatsId.create({
            nameChat: chatId,
            nsfwMenu: false,
            welcome: false
        })

        await newChat.save()
            .then(msg.reply("Registrado correctamente!✅"))
            .catch(err => msg.reply("*⚠️ ERROR [★]*\n\n*No has podido registrar el chat*"))

        console.log(newChat);

    } else if (msg.body.startsWith("!Fuck ") || msg.body.startsWith("!fuck ")) {

        const chatId = msg.id.remote;
        const findChat = await chatsId.findOne({nameChat: chatId});

        if (findChat === null) {
            
            msg.reply("*⚠️ ERROR [★]*\n\n*El chat no está registrado! Regístralo usando el siguiente comando:*\n\n*!RegChat*")
            return;
        
        }

        if (findChat.nsfwMenu === false) {

            msg.reply("*⚠️ ERROR [★]*\n\n*Nsfw no está activado! Actívalo usando el siguiente comando:*\n\n*!Nsfw enable*")
            return;
        
        }

        media.mediapeople(client, msg, MessageMedia, "4", "fuck")

    }
})

client.on('message', async msg => {
    
    if (msg.body.startsWith('!Math ') || msg.body.startsWith('!math ')) {

        const calc = msg.body.slice(6);

        try {
            
            msg.reply(`${calc} = ${math.evaluate(calc)}`)
       
        } catch (err) {

            msg.reply(`*⚠️ ERROR [★]*\n\n*No se ha podido realizar la operación! Quizás hayas intentado operar un número con una letra*\n\n*Ejemplo: !Math 5 + a*\n\n*O simplemente no esté bien hecha la operación*\n\n*Ejemplo:*\n\t*!Math 5 x 5 ❌*\n\t*!Math 5 * 5 ✅*`)

        }

    }
})
