const { MessageMedia } = require("whatsapp-web.js");
const { Schema, mongoose } = require('mongoose');
require('./connection')
const personId = require('./models/Person')

module.exports = {

  mediapeople: async function (client, msg, MessageMedia, number, name) {

    async function send(client, msg, MessageMedia, number, name, message) {

      let media = await MessageMedia.fromFilePath(`./media/${name + random_number}.mp4`);
      client.sendMessage(msg.from, media, { sendVideoAsGif: true, caption: message, mentions })

    }

    let chat = await msg.getChat();
    let user = await msg.getContact();
    let mention = await msg.getMentions();
    let random_number = Math.floor(Math.random() * number) + 1;
    let mentions = []

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

    if (!chat.isGroup) {

      msg.reply("Esto sólo puede ser usado en grupos!");
      return;

    } else {

      const contactID = (await msg.getContact()).id._serialized

      if (cooldown.useLock(contactID)) {

        for (let contact of mention) {

          mentions.push(contact, user);

          if (name == "kiss") {
  
              let message = `@${user.id.user} ha besado a @${contact.id.user}`
              send(client, msg, MessageMedia, number, name, message)

          } else if (name == "hit" ) {

              let message = `@${user.id.user} ha golpeado a @${contact.id.user}`;
              send(client, msg, MessageMedia, number, name, message)
  
          } else if (name == "givemefive") {
  
              let message = `@${user.id.user} ha chocado los cinco con @${contact.id.user}`
              send(client, msg, MessageMedia, number, name, message)
  
          } else if (name == "hug") {
  
              let message = `@${user.id.user} ha abrazado a @${contact.id.user}`
              send(client, msg, MessageMedia, number, name, message)

          } else if (name === "fuck") {

            let message = `@${user.id.user} ha follado a @${contact.id.user}`
            send(client, msg, MessageMedia, number, name, message)

          }
        }

      } else {

        msg.reply("*Espera 20 segundos para poder usar un comando*")

      }
    }
  },

  angry: async function (client, msg, MessageMedia, number, name) {

    async function send(client, msg, MessageMedia, number, name, message) {

      let media = MessageMedia.fromFilePath(`./status/${name + random_number}.mp4`)
      client.sendMessage(msg.from, media, { sendVideoAsGif: true, caption: message })

    }

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
      
    const chat = await msg.getChat();
    const contact = await msg.getContact();
    const numberPerson = contact.id.user;
    let random_number = Math.floor(Math.random() * number) + 1;
    const contactID = (await msg.getContact()).id._serialized

    if (cooldown.useLock(contact)) {

      if (name == "angry") {

        const findUser = await personId.findOne({personId: numberPerson})

        if (findUser == null) {

          msg.reply(`*⚠️ ERROR [★]*\n\n*No estás registrado.Regístrate usando :*\n\n!Reg tuNombre tuEdad\n\nEjemplo: !Reg Ian 15`);

        } else {

          let message = `@+${contact.id.user} ahora está enfadado 😠`
          send(client, msg, MessageMedia, number, name, message)

          const newStatus = await personId.findOneAndUpdate({personId: numberPerson}, {
            estado: "enfadado"
          })

        }
      
      }

    } else {

      msg.reply("*Espera 20 segundos para poder usar un comando*")

    }

  },

  normal: async function (client, msg, MessageMedia, number, name) {

    async function send(client, msg, MessageMedia, number, name, message) {

      let media = MessageMedia.fromFilePath(`./status/${name + random_number}.mp4`)
      client.sendMessage(msg.from, media, { sendVideoAsGif: true, caption: message })

    }

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
      
    const chat = await msg.getChat();
    const contact = await msg.getContact();
    const numberPerson = contact.id.user;
    let random_number = Math.floor(Math.random() * number) + 1;
    const contactID = (await msg.getContact()).id._serialized

    if (cooldown.useLock(contact)) {

      if (name == "normal") {

        const findUser = await personId.findOne({personId: numberPerson})

        if (findUser == null) {

          msg.reply(`*⚠️ ERROR [★]*\n\n*No estás registrado.Regístrate usando :*\n\n!Reg tuNombre tuEdad\n\nEjemplo: !Reg Ian 15`);

        } else {

          let message = `@+${contact.id.user} ahora está normal 🙂`
          send(client, msg, MessageMedia, number, name, message)

          const newStatus = await personId.findOneAndUpdate({personId: numberPerson}, {
            estado: "normal"
          })

        }
      
      }

    } else {

      msg.reply("*Espera 20 segundos para poder usar un comando*")

    }

  },

  sad: async function (client, msg, MessageMedia, number, name) {

    async function send(client, msg, MessageMedia, number, name, message) {

      let media = MessageMedia.fromFilePath(`./status/${name + random_number}.mp4`)
      client.sendMessage(msg.from, media, { sendVideoAsGif: true, caption: message })

    }

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
      
    const chat = await msg.getChat();
    const contact = await msg.getContact();
    const numberPerson = contact.id.user;
    let random_number = Math.floor(Math.random() * number) + 1;
    const contactID = (await msg.getContact()).id._serialized

    if (cooldown.useLock(contact)) {

      if (name == "sad") {

        const findUser = await personId.findOne({personId: numberPerson})

        if (findUser == null) {

          msg.reply(`*⚠️ ERROR [★]*\n\n*No estás registrado.Regístrate usando :*\n\n!Reg tuNombre tuEdad\n\nEjemplo: !Reg Ian 15`);

        } else {

          let message = `@+${contact.id.user} ahora está triste 😔`
          send(client, msg, MessageMedia, number, name, message)

          const newStatus = await personId.findOneAndUpdate({personId: numberPerson}, {
            estado: "triste"
          })

        }
      
      }

    } else {

      msg.reply("*Espera 20 segundos para poder usar un comando*")

    }

  },

  happy: async function (client, msg, MessageMedia, number, name) {

    async function send(client, msg, MessageMedia, number, name, message) {

      let media = MessageMedia.fromFilePath(`./status/${name + random_number}.mp4`)
      client.sendMessage(msg.from, media, { sendVideoAsGif: true, caption: message })

    }

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
      
    const chat = await msg.getChat();
    const contact = await msg.getContact();
    const numberPerson = contact.id.user;
    let random_number = Math.floor(Math.random() * number) + 1;
    const contactID = (await msg.getContact()).id._serialized

    if (cooldown.useLock(contact)) {

      if (name == "happy") {

        const findUser = await personId.findOne({personId: numberPerson})

        if (findUser == null) {

          msg.reply(`*⚠️ ERROR [★]*\n\n*No estás registrado.Regístrate usando :*\n\n!Reg tuNombre tuEdad\n\nEjemplo: !Reg Ian 15`);

        } else {

          let message = `@+${contact.id.user} ahora está feliz 😃`
          send(client, msg, MessageMedia, number, name, message)

          const newStatus = await personId.findOneAndUpdate({personId: numberPerson}, {
            estado: "feliz"
          })

        }
      
      }

    } else {

      msg.reply("*Espera 20 segundos para poder usar un comando*")

    }

  }
}