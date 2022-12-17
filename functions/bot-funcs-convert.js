module.exports = {

    sticker: async function(msg, chat) {

        if (!msg.hasMedia) {

            chat.sendMessage("*_ERROR : tienes que mandar una foto_*");
            return 0;

        }

        const media = await msg.downloadMedia();

        chat.sendMessage(media, {
            stickerName: "luffy 👒",
            stickerAuthor: "+34671981875",
            sendMediaAsSticker: true
        });

    },
    sti: async function(chat, msg) {
      
        const quote = await msg.getQuotedMessage();

        if (quote.hasMedia == true && quote.type.toLowerCase() != "sticker") {
            
            chat.sendMessage("*_ERROR : sólo se puede con stickers_*")
            return 0;

        }

        const media = await quote.downloadMedia().catch(a => { return 'fallado'; });
        
        if (media === 'fallado') {
            
            return chat.sendMessage('*_ERROR : se ha fallado la descarga del sticker. Es demasiado antiguo._*')
        
        }

        chat.sendMessage(media);

    }
}