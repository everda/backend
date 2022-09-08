require('dotenv').config();
let args = process.argv.slice(2)
let config = {

    port: process.env.PORT || 8080,
    secret_key: process.env.SECRET_KEY || 'secret',
    private_key: process.env.PRIVATE_KEY,
    refresh_private_key: process.env.REFRESH_PRIVATE_KEY,
    session_time: process.env.SESSION_TIME || '10m',
    mongoUrl: process.env.MONGO_ATLAS_URI || 'mongodb+srv://root:root@cluster0.5dnqz.mongodb.net/everdadb?retryWrites=true&w=majority',
    DB: process.env.DB || 'Mongo',
    cluster_mode: args[0] || 'FORK',
    dev: process.env.NODE_ENV != 'production',
    mail_to: process.env.MAIL_TO,
    mail_from: process.env.MAIL_FROM || 'Tienda EV',
    mail_pass: process.env.MAIL_PASS,
    twilio_sid: process.env.TWILIO_SID,
    twilio_authtoken: process.env.TWILIO_AUTHTOKEN,
    twilio_number: process.env.TWILIO_NUMBER,
    twilio_whatsapp: process.env.TWILIO_WHATSAPP,
    twilio_waReciever: process.env.TWILIO_WARECIEVER,
    prueba: "prueba",
    sessionTime: 10
}

module.exports = config;