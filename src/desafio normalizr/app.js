const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");
const db = require("./src/models/messageModelArchivo.js");
let { schema, normalize, desnormalize } = require('normalizr');

const dbdata = new db()



const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log(`Listening service on port ${port}`);
}
);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    console.log("se solicito servicio desde:" + req.method + " - " + req.url);
    next()
}
);




const io = new Server(server);
(async () => {
    let chatLog = JSON.parse(await dbdata.getData());
    const authorSchema = new schema.Entity('author', {}, { idAttribute: 'email' });
    //const mensaje = new schema.Entity('message', {author }, 'text');
    const chatSchema = new schema.Entity('chat', { mensajes: [{author: authorSchema}] });
//console.log(chatLog.mensajes)

    const util = require('util');
    let chatNormalizado = normalize(chatLog, chatSchema);
   // console.log(util.inspect(chatNormalizado, false, 12, false))

    console.log(chatNormalizado.entities.chat.mensajes);
    // chatLog = normalize(chatLog, [schema]);



    io.on("connection", socket => {
        console.log("cliente conectado");
        console.log("envio");
        socket.on('init', () => {
            socket.emit("log", chatNormalizado);
        });
        socket.on("mensaje", async (data) => {
            // console.log(chatLog.mensajes);
            //data = desnormalize(data, schema);
            chatLog.mensajes.push(data);
            await dbdata.saveData(chatLog);
            chatNormalizado = normalize(chatLog, chatSchema);
            io.emit("log", chatNormalizado);
        }
        );
    }
    );

}
)();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', require('./routes/viewsRouter.js'));
app.use('/api/products', require('./routes/productRoute.js'));
//app.use('/api/messages', require('./routes/messageRoute'));

