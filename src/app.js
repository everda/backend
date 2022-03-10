import express from "express";
import fs from "fs";

const app = express();
const port = 8080;
const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

let visitRandom = 0;
let visitItem = 0;

const getItems = async () => {
    try {
        const items = JSON.parse(await fs.promises.readFile("productos.txt", "utf-8"))
        return items;
    } catch (error) {
        console.log(error);
    }
}


/*End Point*/
app.get("/items", async (req, res) => {
    try {
        let items = await getItems();
        let quantity = items.length;
        res.send({ items, quantity });
        visitItem++;
    } catch (error) {
        console.log(error);
    }
});


app.get("/items-random", async (req, res) => {
    try {
        let items = await getItems();
        let quantity = items.length;
        let id = Math.floor(Math.random() * quantity + 1);
        let item = items.find(item => item.id === id);
        res.send({ item });
        visitRandom++;
    } catch (error) {
        console.log(error);
    }
});

app.get("/visitas", async (req, res) => {
    try {
        res.send({ visitas: { items: visitItem, item: visitRandom } });
    } catch (error) {
        console.log(error);
    }
});