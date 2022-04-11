import Cart from "../models/cartModel.js";
import Products from "../models/products.js";
import __dirname from "../utils.js";

let cart = new Cart(__dirname + '/Files/carrito.txt');
let products = new Products(__dirname + '/Files/productos.txt');

const showCart = (req, res) => {
    cart.getCart().then(data => {
        // res.render('cart.handlebars', { products: products });
        let products = JSON.parse(data);
        res.render('cart.handlebars', { products });
    }
    ).catch(err => {
        console.log(err);
    })
}

const showUsers = (req, res) => {
    products.getProducts().then(data => {
        res.render('users.handlebars', { products: data });
    }
    ).catch(err => {
        console.log(err);
    }
    )
}

const showAdminview = (req, res) => {
    products.getProducts().then(data => {
        let products = JSON.parse(data);
        res.render('admin.handlebars', { products });
    }).catch(err => {
        console.log(err);
    }
    )
}

const showEditItemview = (req, res) => {
    let id = parseInt(req.params.id);
    products.getProductById(id).then(data => {
        let product = data;
        console.log("hola")
        console.log(typeof product)
        res.render('editProduct.handlebars', { product });
    }).catch(err => {
        console.log(err);
    }
    )
}



export default { showCart, showUsers, showAdminview, showEditItemview };