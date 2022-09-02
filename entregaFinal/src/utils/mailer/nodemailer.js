let { createTransport } = require('nodemailer')
let config = require('../../config/index')

let winston = require('../loggers/winston')


const transport = createTransport({

    service: 'gmail',
    port: 587,
    auth: {
        user: config.mail_to,
        pass: config.mail_pass
    }
})


const sendMail = async (user) => {

    try {
        const opts = {
            from: config.mail_from,
            to: config.mail_to,
            subject: 'nuevo registro',
            html: `Se registro el usuario ${user}`
        }
        const response = await transport.sendMail(opts)
    }
    catch (error) {
        //console.log(error)
        winston.errorLogger.error(error)
    }
}


const sendConfirmationMail = async (user, pedido) => {

    try {
        const opts = {
            from: "tiendaEV",
            to: config.mail_to,
            subject: `nuevo pedido de ${user}`,
            html: `${pedido}`
        }
        const response = await transport.sendMail(opts)
    }
    catch (error) {
        //console.log(error)
        winston.errorLogger.error(error)
    }
}

module.exports = { sendMail, sendConfirmationMail }