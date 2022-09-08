const express = require('express');
const handlebars = require('express-handlebars');
const cors = require('cors')
let config = require('./config/index.js');
let winston = require('./utils/loggers/winston')
const chatInit = require('./components/chat')
const startSession = require('./components/login')
const routes = require('./routes')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

class Server {
    constructor() {
        this.app = express();
        this.port = config.port;
        this.settings();
        this.views();
        this.middleware();
        this.routes();
        this.chatInit()
        this.expressSession();
        this.middlewareError()

    }

    settings() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static(__dirname + '/public'));
        this.app.use(cookieParser());

    }

    views() {
        this.app.engine('handlebars', handlebars.engine());
        this.app.set('views', __dirname + '/handlebars');
        this.app.set('view engine', 'handlebars');
    }

    middleware() {
        this.app.use(cors('*'));
        this.app.use(morgan('common'));
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            //winston.consoleLogger.info(`header middleware ${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`)
            next()
        });
    }

    middlewareError() {
        this.app.use((req, res, next) => {
            const error = new Error('Not found')
            error.status = 400
            next(error)

        })
        this.app.use((err, req, res, next) => {
            let status = (err.status || 500)
            res.status(status).send({
                error: {
                    status: "error",
                    message: err.message
                }
            })
        })
    }


    routes() {
        routes(this.app);

    }
    chatInit() {
        //  chatInit(this.server)

    }

    expressSession() {
        startSession(this.app)

    }


    init() {
        this.server = this.app.listen(this.port, () => { winston.consoleLogger.info(`http://localhost:${this.port}`) });
    }
}





module.exports = new Server()