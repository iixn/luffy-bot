const momentTimezone = require('moment-timezone')
const momentjs = require('moment')

module.exports = {
    printTimezone: async function(chat) {
        
        const date = new Date()
        const moment = momentTimezone(date)
        const colombia = momentjs.tz('America/Bogota').format('LTS').split(':')
        const españa = momentjs.tz('Europe/Madrid').format('LTS').split(':')

        let resultEspaña = Number(españa[0]) - 2
        let resultColombia = Number(colombia[0]) - 2

        if (resultEspaña < 0) {
            resultEspaña = 0;
        }

        chat.sendMessage(`*_🕒 Hora de Colombia: ${resultColombia}:${colombia[1]}:${colombia[2]}_*
*_🕒 Hora de España: ${resultEspaña}:${españa[1]}:${españa[2]}_*`)

    }
}