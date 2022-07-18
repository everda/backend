const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const { Server } = require('socket.io')
const res = require('express/lib/response');
let config = require('./config/index.js');
const mongoStore = require("connect-mongo");
const expressSession = require("express-session");
const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
const { passport } = require('./components/login/controller/passportController')
const chatController = require('./components/chat/controller/chatController');
const cluster = require('cluster');
let numCPUs = require('os').cpus().length;
let winston = require('./utils/loggers/winston')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


if (config.cluster_mode === "CLUSTER") {

    //console.log("loaded Cluster Mode");
    winston.consoleLogger.info("loaded Cluster Mode")
    if (cluster.isMaster) {
        for (let index = 0; index < numCPUs; index++) {
            cluster.fork()

        }
    } else {
        const server = app.listen(config.port, () => {
            //console.log(`Server running on port ${config.port}`);
            winston.consoleLogger.info(`Server running on port ${config.port}`)
        });

        const io = new Server(server);
        (async () => {
            // let chatLog = JSON.parse(await dbdata.getData());
            // const authorSchema = new schema.Entity('author', {}, { idAttribute: 'email' });
            // const chatSchema = new schema.Entity('chat', { mensajes: [{ author: authorSchema }] });
            // let chatNormalizado = normalize(chatLog, chatSchema);
            // console.log(chatNormalizado.entities.chat.mensajes);

            let chatNormalizado = await chatController.getNormalizedChatLog()

            io.on("connection", socket => {
                //console.log("cliente conectado");
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
        )();
    }
} else {
    //console.log("loaded FORK Mode");
    winston.consoleLogger.info("loaded FORK Mode")

    const server = app.listen(config.port, () => {
        //console.log(`Server running on port ${config.port}`);
        winston.consoleLogger.info(`Server running on port ${config.port}`)
    });

    const io = new Server(server);
    (async () => {
        // let chatLog = JSON.parse(await dbdata.getData());
        // const authorSchema = new schema.Entity('author', {}, { idAttribute: 'email' });
        // const chatSchema = new schema.Entity('chat', { mensajes: [{ author: authorSchema }] });
        // let chatNormalizado = normalize(chatLog, chatSchema);
        // console.log(chatNormalizado.entities.chat.mensajes);

        let chatNormalizado = await chatController.getNormalizedChatLog()

        io.on("connection", socket => {
            //console.log("cliente conectado");
            winston.consoleLogger.info("cliente conectado")

            socket.on('init', () => {
                socket.emit("log", chatNormalizado);
            });
            socket.on("mensaje", async (data) => {
                // console.log(chatLog.mensajes);
                //data = desnormalize(data, schema);

                await chatController.addMessage(data)
                chatNormalizado = await chatController.getNormalizedChatLog()
                io.emit("log", chatNormalizado);
            }
            );
        }
        );

    }
    )();
}


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    // console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
    winston.consoleLogger.info(`header middleware ${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`)
    next()
});





app.use(expressSession({
    store: mongoStore.create({
        mongoUrl: config.mongoUrl,
        mongoOptions: advancedOptions
    }),
    secret: "secret",
    resave: false,
    rolling: true,
    cookie: { maxAge: 1000 * 60 * 10 },
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/loginRouter'))
app.use('/', require('./routes/viewsRouter'))
app.use('/api', require('./routes/api'))
//app.use('/api/randoms', require('./components/random/routes/randomRouter'))

app.use('*', (req, res) => {
    winston.warningLogger.warn(`${req.method} request for '${req.originalUrl}'`)
    res.send('pagina inexistente')
})




