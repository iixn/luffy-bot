const ytsr = require('@distube/ytsr');
const axios = require('axios')

module.exports = {
    tz: function(chat) {
        
        const fecha = new Date();
        let hora = fecha.getHours();
        let minutos = fecha.getMinutes();
        let segundos = fecha.getSeconds();

        let text = "*_Horas del mundo ๐ :_*\nโโโโ\n"
        let paises = []

        let Moscu = {tiempo: hora + 2, nombre: "Moscรบ ๐ท๐บ : "}
        let Amsterdam = {tiempo: hora, nombre: "Amsterdam ๐ณ๐ฑ : "} // igual
        let Pekin = {tiempo: (hora + 7), nombre: "Pekรญn ๐จ๐ณ : "}
        let Toronto = {tiempo: (hora + 18), nombre: "Toronto ๐จ๐ฆ : "}
        let Sydney = {tiempo: (hora + 10), nombre: "Sydney ๐ฆ๐บ : "}
        let Madrid = {tiempo: hora, nombre: "Madrid ๐ช๐ธ : "} // igual
        let Berlin = {tiempo: hora, nombre: "Berlรญn ๐ฉ๐ช : "} // igual
        let Seul = {tiempo: (hora + 8), nombre: "Seรบl ๐ฐ๐ท : "}
        let Bruselas = {tiempo: hora, nombre: "Bruselas ๐ง๐ช : "} // igual
        let Washington = {tiempo: (hora + 18), nombre: "Washington ๐บ๐ธ : "}
        let Tokyo = {tiempo: (hora + 8), nombre: "Tokyo ๐ฏ๐ต : "}
        let Paris = {tiempo: hora, nombre: "Parรญs ๐ซ๐ท : "} // igual
        let Londres = {tiempo: (hora + 23), nombre: "Londres ๐ฌ๐ง : "}
        let Colombia = {tiempo: (hora + 18), nombre: "Colombia ๐จ๐ด : "}
        let Mexico = {tiempo: (hora + 17), nombre: "Mรฉxico ๐ฒ๐ฝ : "}
        let Portugal = {tiempo: (hora + 23), nombre: "Portugal ๐ต๐น : "}

        paises.push(Moscu, Amsterdam, Pekin, Toronto, Sydney, Madrid, Berlin, Seul, Bruselas, Washington, Tokyo, Paris, Londres, Colombia, Mexico, Portugal);

        for (let i in paises) {
            if (paises[i].tiempo >= 24) {
                text += `โ  *_${paises[i].nombre}${paises[i].tiempo - 24}:${minutos}:${segundos}_*\n`
                continue
            }
            text += `โ  *_${paises[i].nombre}${paises[i].tiempo}:${minutos}:${segundos}_*\n`
        }

        text += "โโโโ"      

        chat.sendMessage(text);
    },
    searchVideo: async function(msg, chat) {

        const user = await msg.getContact();
        let mentions = [];
        mentions.push(user);

        if ((msg.body.toLowerCase() === "!searchvideo")) {

            chat.sendMessage("*_ERROR : uso : !searchvideo video_*")
            return 0;

        }

        try {

            const data = msg.body.slice(13);
            const search = await ytsr(data, { safeSearch: true, limit: 1 });
            const video = await search.items[0].id;

            chat.sendMessage(`*_@${user.id.user} aquรญ estรกn los resultados de la bรบsqueda :_*\n*_๐ "${data}"_*\n*_Espero que te sirva ๐_*\n\n*_https://www.youtube.com/watch?v=${video}_*`, { mentions });
        
        } catch (err) {

            chat.sendMessage(err);
        
        }
        
    },
    ig: async function(msg, chat) {

        if ((msg.body.toLowerCase() === "!ig")) {

            chat.sendMessage("*_ERROR : uso : !ig tuNombreIg_*");
            return 0;

        }

        if (!chat.isGroup) {

            chat.sendMessage("*_AVISO โโ_*\n\n*_No tiene sentido usar este comando si no es en un grupo_*");
            return 0;

        }

        const ig = msg.body.slice(4);
        let mentions = [];
        const contact = await msg.getContact();
        mentions.push(contact);
        let url = `https://instagram.com/${ig}`;

        try {
        
            await axios(url);
            chat.sendMessage(`*_<--- โ ๏ธ IMPORTANTE โ ๏ธ --->_*\n\n*_ยกยกSeguir todos a @${contact.id.user} en instagram!!_*\n*_${url}_*`, { mentions });
        
        } catch (err) {
            
            chat.sendMessage(`*_Vaya...No se ha podido encontrar tu usuario @${contact.id.user} ๐ฟโ_*`, { mentions })
            return 0;

        }
    },
    tiempo: async function(msg, chat) {

        if ((msg.body.toLowerCase() === "!tiempo")) {

            chat.sendMessage("*_ERROR : uso : !weather ciudad_*");
            return 0;

        }

        const city = msg.body.slice(8);
        const contact = await msg.getContact();
        let mentions = [];
        mentions.push(contact);

        try {

            const req = await axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=efcb762e20b0472b41de5254a7574690&lang=es`);
            chat.sendMessage(`*_@${contact.id.user} aquรญ estรกn tus resultados :_*\n\n*[๐]* *_Ciudad : ${req.data.name}_*\n*[๐]* *_Paรญs : ${req.data.sys.country}_*\n*[โ]* *_Tiempo : ${req.data.weather[0].description}_*\n*[๐ก๏ธ]* *_Temperatura : ${(req.data.main.temp - 273.15).toFixed(2)} ยบC_*\n*[โจ๏ธ]* *_Temp.Max : ${(req.data.main.temp_max - 273.15).toFixed(2)} ยบC_*\n*[โ๏ธ]* *_Temp.Min : ${(req.data.main.temp_min - 273.15).toFixed(2)} ยบC_*\n*[๐]* *_Viento : ${req.data.wind.speed} km/h_*\n*[๐ง]* *_Humedad : ${req.data.main.humidity} %_*`, { mentions })
        
        } catch (err) {

            chat.sendMessage(`*_Vaya...No se ha podido encontrar tu ciudad @${contact.id.user} ๐ฟโ_*\n\n*_Asegรบrate de que estรฉ bien escrita o espera un poco a volver a buscarla_*`, { mentions })

        }

    }
}