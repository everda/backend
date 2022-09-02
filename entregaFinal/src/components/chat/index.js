const winston = require('../../utils/loggers/winston')
const chatController = require('./controller/chatController')
const { Server } = require('socket.io')


module.exports = server => {
    const io = new Server(server);
    let chatNormalizado = await chatController.getNormalizedChatLog()
    io.on("connection", socket => {
        winston.consoleLogger.info("cliente conectado")
        socket.on('init', () => {
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

