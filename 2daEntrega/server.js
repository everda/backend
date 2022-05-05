const express = require('express')
const app = express()
const { config } = require('./config/')
const port = config.port
const { productRouter } = require('./routes/product')
const { cartRouter } = require('./routes/cart')




//let port = process.env.PORT || 3000

console.log(port)
console.log(config.path)



app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    console.log("se solicito servicio desde:" + req.method + " - " + req.url);
    next()
}
)

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}
);
