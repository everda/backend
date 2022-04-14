import { async } from "rxjs";
import Cart from "../models/cartModel.js";
import Products from "../models/products.js";
import __dirname from "../utils.js";

let cart = new Cart(__dirname + '/Files/carrito.txt');
let products = new Products(__dirname + '/Files/productos.txt');

const showProductsInfo = async (productsObject) => {
    console.log("aca")
    let productsContent = [];
    for (let i = 0; i < productsObject.length; i++) {
        let productInfo = await products.getProductById(productsObject[i].id);
        productsContent.push({ ...productsObject[i], ...productInfo });
        //console.log(productsContent)
    }
    return productsContent
}

const showCart = (req, res) => {
    let id = parseInt(req.params.id);
    cart.getCartPrdoducts(id).then(data => {
        let cart = data;
        // console.log(cart)
        showProductsInfo(cart).then(data => {
            let cart = data;
            res.render('cart.handlebars', { cart });
        }).catch(err => {
            console.log(err);
        }
        )
    }
    ).catch(err => {
        console.log(err);
    })
}

const showUsers = (req, res) => {
    products.getProducts().then(data => {
        let products = JSON.parse(data);
        res.render('users.handlebars', { products: products });
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

        res.render('editProduct.handlebars', { product });
    }).catch(err => {
        console.log(err);
    }
    )
}



export default { showCart, showUsers, showAdminview, showEditItemview };