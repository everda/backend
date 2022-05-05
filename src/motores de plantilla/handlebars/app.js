import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./util.js";
import Producto from "./api/product.js";

const app = express();
const port = 8080
const server = app.listen(port, () => {
    console.log(`Listening service on port ${port}`);
})



app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + "/views"));


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


const instancia = new Producto();
let newId = 0;

app.get('/', (req, res) => {
    console.log("renderizo home")
    res.render('home.handlebars');

})

app.get('/products', (req, res) => {
    let items = instancia.getProducts();
    console.log("renderizo productos")
    res.render('products.handlebars', { items });
})


app.post("/", (req, res) => {
    let id = newId;
    let { name, price, thumbnail } = req.body;
    instancia.createProduct(id, name, price, thumbnail);
    newId++;
    res.status(200).render('home.handlebars');
    //send({ message: "Producto guardado", producto: instancia.getProduct(id) });
    console.log(instancia.getProducts());
});

