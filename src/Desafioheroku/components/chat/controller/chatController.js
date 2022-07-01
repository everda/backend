const chatDB = require('../services/messageModelMongo')
const dbdata = new chatDB()
let { schema, normalize, denormalize } = require('normalizr');
const winston = require('../../../utils/loggers/winston')

const authorSchema = new schema.Entity('author', {}, { idAttribute: 'email' });
//const mensaje = new schema.Entity('message', {author }, 'text');
const chatSchema = new schema.Entity('chat', { mensajes: [{ author: authorSchema }] });


let getNormalizedChatLog = async () => {
    try {
        let chatLog = await dbdata.getMessages();

        let response = normalize(chatLog, chatSchema);

        return response
    } catch (error) {
        winston.errorLogger.error(error)
    }
}


let addMessage = async (data) => {
    try {
        let chatNormalizado = await getNormalizedChatLog();
        let chatLog = await denormalize(chatNormalizado.result, chatSchema, chatNormalizado.entities)
        chatLog.mensajes.push(data);
        await dbdata.saveMessage(chatLog)
    } catch (error) {
        winston.errorLogger.error(error)
    }
}

module.exports = {
    getNormalizedChatLog, addMessage
}