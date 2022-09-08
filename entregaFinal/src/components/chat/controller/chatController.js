//const dbdata = require('../services/messageModelMongo')
let { schema, normalize, denormalize } = require('normalizr');
const winston = require('../../../utils/loggers/winston')

const authorSchema = new schema.Entity('author', {}, { idAttribute: 'email' });
//const mensaje = new schema.Entity('message', {author }, 'text');
const chatSchema = new schema.Entity('chat', { mensajes: [{ author: authorSchema }] });
const ChatService = require('../services/chatService')


let getNormalizedChatLog = async () => {
    try {
        let chatLog = await ChatService.getMessages();
        //console.log(chatLog);
        let response = normalize(chatLog, chatSchema);
        //console.log(response);
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