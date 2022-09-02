const winston = require('../../../utils/loggers/winston')
const ContainerMongo = require('../../../models/mongoModel');
const messageSchema = require('../schema/messageSchema');



class messageModelMongo extends ContainerMongo {
    constructor() {
        super(messageSchema, 'messagesCollection');
    }

    async getMessages() {
        try {
            let messages = await this.model.find({}, '-_id -__v').lean();

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
            let oldMessages = await this.getMessages()
            if (oldMessages.mensajes.length === 0) {

                let response = await this.model.create(message);

                return "creado"
            } else {
                let response = await this.model.findOneAndUpdate({ id: 'mensajes', mensajes: message.mensajes });
                return "creado";
            }
        } catch (error) {
            winston.errorLogger.error(error)
        }
    }


}

module.exports = new messageModelMongo();
