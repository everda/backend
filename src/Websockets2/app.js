import express from "express";
import { Server } from "socket.io";
import util from "./utils.js";


const app = express();
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log(`Listening service on port ${port}`);
}
);

const io = new Server(server);
let chatLog = [];

io.on("connection", (socket) => {
    socket.on("mensaje", (data) => {
        //console.log(data)

        //console.log(util.formatedDate())
        chatLog.push(data); //agrego palabra al chat
        io.emit("log", chatLog); //io es global, socket es por el cliente que me envio

    });



});



app.use("/", express.static(util.__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))



