let twilio = require('twilio')
const { twilio_authtoken } = require('../../config/index')
let config = require('../../config/index')
let winston = require('../loggers/winston')

let twilio_client = twilio(config.twilio_sid, twilio_authtoken, {
    lazyLoading: true
})


const sendTwillioMessage = async (message) => {
    try {
        console.log("envio WA");
        twilio_client.messages.create({
            from: config.twilio_whatsapp,
            body: message,
            to: config.twilio_waReciever

        })

    } catch (error) {
        winston.errorLogger.error(error)
    }
}
const sendUserMessage = async (clientNumber, message) => {
    try {

        twilio_client.messages.create({
            from: config.twilio_number,
            body: message,
            to: clientNumber

        })

    } catch (error) {
        console.log(error);
        winston.errorLogger.error(error)
    }
}


module.exports = { sendTwillioMessage, sendUserMessage }