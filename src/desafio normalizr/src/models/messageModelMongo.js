const ContainerMongo = require('../container/containerMongo');
const messageSchema = require('../schema/messageSchema');



class messageModelMongo extends ContainerMongo {
    constructor() {
        super(messageSchema, 'messagesCollection');
    }

    async getMessages() {
        try {
            let messages = await this.model.find({});
            return messages;
        } catch (error) {
            throw error;
        }
    }

    async saveMessage(message) {
        try {
            

            let response = await this.model.findByIdAndUpdate({ id: hor, message: message });
            return response;
        } catch (error) {
            throw error;

        }
    }
}

module.exports = messageModelMongo;
