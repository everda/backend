const winston = require('../../../utils/loggers/winston')
const dao = require('../../../models')


class ChatService {


    async getMessages() {
        try {
            let messages = await dao.chatDao.getMessages()
            if (messages.length > 0) {

                return messages[0];
            }
            else {


                return { id: "mensajes", mensajes: [] };

            }
        } catch (error) {
            winston.errorLogger.error(error)
        }

    }

    async saveMessage(message) {
        try {
            let oldMessages = await dao.chatDao.getMessages()
            if (oldMessages.mensajes.length === 0) {

                let response = await this.model.create(message);

                return "creado"
            } else {
                //let response = await this.model.findOneAndUpdate({ id: 'mensajes', mensajes: message.mensajes });
                let response = await dao.chatDao.saveMessage(message)
                return "creado";
            }
        } catch (error) {
            winston.errorLogger.error(error)
        }
    }


}

module.exports = new ChatService();
