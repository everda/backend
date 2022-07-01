const winston = require('../../../utils/loggers/winston')


const ContainerArchivo = require('../container/containerArchivo');

class MessageModelArchivo extends ContainerArchivo {
    constructor() {
        super('files/messages.txt');
    }

    async getMessages() {
        try {
            let messages = JSON.parse(await this.getData());
            console.log(messages)
            return messages;
        } catch (error) {
            winston.errorLogger.error(error)
        }
    }

    async saveMessage(message) {
        try {
            let messages = {id:'mensajes', mensajes: message}
            console.log(messages)
            let response = JSON.parse(await this.saveData(messages));
            return response;
        } catch (error) {
            winston.errorLogger.error(error)
        }
    }
}

module.exports = MessageModelArchivo;