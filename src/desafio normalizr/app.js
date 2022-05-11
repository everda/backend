const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");



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
let chatLog = [];

io.on("connection", socket => {
    console.log("cliente conectado");
    console.log("envio");
    socket.on('init', () => {
        socket.emit("log", chatLog);
    });
    socket.on("mensaje", data => {
        chatLog.push(data);

        io.emit("chatLog", chatLog);
    }
    );
}
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', require('./routes/viewsRouter.js'));
app.use('/api/products', require('./routes/productRoute.js'));
//app.use('/api/messages', require('./routes/messageRoute'));

