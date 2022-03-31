import express from "express";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import cartRoute from "./Routes/Carrito.js";
import productRoute from "./Routes/Productos.js";

const app = express();
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log(`Listening service on port ${port}`);
    
}
);




const io = new Server(server);

let admin = false

console.log(__dirname)

app.use("/", express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use("/api/carrito", cartRoute);
app.use("/api/productos", productRoute);
