import Cart from "../models/cartModel.js";
import Products from "../models/products.js";
import utils from "../utils.js";

let cart = new Cart(utils.__dirname + '/Files/carrito.txt');
let products = new Products(utils.__dirname + '/Files/productos.txt');

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
    console.log("entro")
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
        if (data.length > 0) {
            let products = JSON.parse(data);

            res.render('users.handlebars', { products: products });
        } else {
            res.render('users.handlebars', { products: [] });
        }
    }
    ).catch(err => {
        console.log(err);
    }
    )
}

const showAdminview = (req, res) => {
    products.getProducts().then(data => {
        if (data.length > 0) {
            let products = JSON.parse(data);
            res.render('admin.handlebars', { products });
        } else {
            res.render('admin.handlebars', { products: [] });
        }
    }).catch(err => {
        console.log(err);
    }
    )
}

const showAdminAddproduct = (req, res) => {
    res.render('addProduct.handlebars');
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



export default { showCart, showUsers, showAdminview, showEditItemview, showAdminAddproduct };