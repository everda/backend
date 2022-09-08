const winston = require('../../utils/loggers/winston')
const chatController = require('./controller/chatController')
const { Server } = require('socket.io')


module.exports = async (app) => {


    const io = new Server(app);
    let chatNormalizado = await chatController.getNormalizedChatLog()
    console.log(chatNormalizado);
    io.on("connection", socket => {
        winston.consoleLogger.info("cliente conectado")
        socket.on('init', () => {
            console.log(chatNormalizado);
            socket.emit("log", chatNormalizado);
        });
        socket.on("mensaje", async (data) => {
            await chatController.addMessage(data)
            chatNormalizado = await chatController.getNormalizedChatLog()
            io.emit("log", chatNormalizado);
        }
        );
    }
    );

}

