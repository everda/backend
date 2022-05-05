import express from "express";
import {__dirname} from "./utils.js";
import cartRoute from "./Routes/Carrito.js";
import productRoute from "./routes/productos.js";
import viewsRouter from "./routes/viewsRouter.js";
import handlebars from "express-handlebars";
import productController from "./controller/productController.js";
import cartController from "./controller/cartController.js";




const app = express();
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log(`Listening service on port ${port}`);

});



cartController.updateCart()
productController.updateProductsArray()







app.use(express.static(__dirname + "/public"));
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    console.log("se solicito servicio desde:" + req.method + " - " + req.url);
    next();
}
)


app.use('/', viewsRouter);
app.use("/api/carts", cartRoute);
app.use("/api/products", productRoute);
app.all("*", (req, res) => {
    res.status = 404;
    res.send({ error: -2,
        descipcion: `ruta ${req.url} y metodo ${req.method} no encontrada`});
});
