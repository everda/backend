import express from "express";
import __dirname from "./utils.js";
import { Server } from "socket.io";


const app = express();
const port = 8080;
const server = app.listen(port, () => {
    console.log(`Listening service on port ${port}`);
}
);


const io = new Server(server);

app.use("/", express.static(__dirname + "/public"));

io.on("connection", (socket) => {
    console.log("New user connected");
    
    console.log("Nueva conexion");
    socket.on("disconnect", () => {
        console.log("Conexion terminada");
    });
    socket.on("mensaje", (data) => {
        console.log(socket);
        io.emit("log", `el cliente escribio: ${socket.client}`);
    }); 
});





app.use(express.json());
app.use(express.urlencoded({ extended: true }))

