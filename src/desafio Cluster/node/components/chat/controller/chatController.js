const chatDB = require('../services/messageModelMongo')
const dbdata = new chatDB()
let { schema, normalize, denormalize } = require('normalizr');

const authorSchema = new schema.Entity('author', {}, { idAttribute: 'email' });
//const mensaje = new schema.Entity('message', {author }, 'text');
const chatSchema = new schema.Entity('chat', { mensajes: [{ author: authorSchema }] });


let getNormalizedChatLog = async () => {
    let chatLog = await dbdata.getMessages();
    // let chatLog = {
    //     id: "mensajes",
    //     mensajes: [{
    //         author: {
    //             name: "test",
    //             lastname: "apellidoTest",
    //             email: "ASDA@ASD.COM",
    //             age: 33,
    //             avatar: "https://i.pravatar.cc/100"
    //         },
    //         text: "a"
    //     }]
    // }
    let response =  normalize(chatLog, chatSchema);
    
    return response
    
}


let addMessage = async (data) => {
    let chatNormalizado = await getNormalizedChatLog();
    
    let chatLog = await denormalize(chatNormalizado.result, chatSchema, chatNormalizado.entities)
    chatLog.mensajes.push(data);


    await dbdata.saveMessage(chatLog)
}

module.exports = {
    getNormalizedChatLog, addMessage
}