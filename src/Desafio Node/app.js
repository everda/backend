import express from "express";
import { Server } from "socket.io";
import util from "./utils.js";
import config from "./config.js";
import knex from "knex";

const myKnex = knex(config);

const startTable = async () => {
    try {
        const hasTable = await myKnex.schema.hasTable("mensajes");
        if (!hasTable) {
            await myKnex.schema.createTable("mensajes", table => {
                table.increments("id").primary();
                table.string("user");
                table.string("message");
                table.timestamp("date");
            }
            );
        }
    } catch (error) {
        console.log(error);
    }
}
startTable();

const app = express();
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log(`Listening service on port ${port}`);
}
);

const io = new Server(server);
let chatLog = [];

const getChatLog = async () => {
    try {
        const response = await myKnex("mensajes").select("*");
        chatLog = response;
    } catch (error) {
        console.log(error);
    }
}

io.on("connection", (socket) => {
    getChatLog();
    socket.on("mensaje", async (data) => {
        //console.log(data)

        //console.log(util.formatedDate())
        chatLog.push(data); //agrego palabra al chat
        await myKnex("mensajes").insert({
            user: data.user,
            message: data.message,
            date: data.dates
        });


        io.emit("log", chatLog); //io es global, socket es por el cliente que me envio
        console.log(chatLog)



    });



});



app.use("/", express.static(util.__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))



