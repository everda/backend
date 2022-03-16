import express from "express";
import { Producto } from "./Service/product.js";

const app = express();
const port = 8080;
const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
}
);
let newId = 0;

const instancia = new Producto();

app.get("/api/productos/", (req, res) => {
    let items = instancia.getProducts();
    if (items.length > 0) {
        res.send(JSON.stringify(items));
    }
    else {
        res.status(400).send({ error: "No hay productos cargados" });
    }
});

app.get("/api/productos/:id", (req, res) => {
    let id = req.params.id;
    let item = instancia.getProduct(id);
    if (item) {
        res.send(item);
    }
    else {
        res.status(400).send({ error: "Producto no encontrado" });
    }
});

app.post("/api/productos/guardar", (req, res) => {
    let id = newId;
    let recibido = req.body;
    console.log(recibido)
    res.send( "HOLA" + console.log(recibido));
    //let { title, price, thumbnail } = req.body;
    // instancia.createProduct(id, title, price, thumbnail);
    // newId++;
    // res.send({ message: "Producto guardado", producto: instancia.getProduct(id) });
});
