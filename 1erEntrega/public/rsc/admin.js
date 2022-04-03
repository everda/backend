let url = 'localhost:8080';
let cartId = 0;



// CLASE PRODUCTO
class Producto {
    //CONSTRUCTOR DE CLASE PRODUCTO
    constructor(data) {
        this.id = data.id
        if (data.nombre)
            this.nombre = data.nombre.toUpperCase();
        this.precio = parseFloat(data.precio);
        this.vendido = false;
    }
    //MÉTODO PARA SUMAR IVA

}

class Cart {
    constructor(data) {
        this.id = data.id;
        this.timestamp = data.timestamp;
        this.products = data.products;
    }


    addProduct(product) {
    }

}

class CartModel {
    constructor() {
        const getCartid = async (id) => {
            if (cartId === 0) {
                const response = await fetch(`http://${url}/api/carrito/`, {
                    method: 'POST'
                });
                const data = await response.json();

                cartId = data.carrito;
            }

            return cartId;
        }


    }
    //MÉTODO PARA CREAR CARRITO

    //MÉTODO PARA AGREGAR PRODUCTO AL CARRITO
    addProduct(product) {
        this.cart.products.push(product);


        getCartid = async (id) => {
            if (cartId === 0) {
                const response = await fetch(`http://${url}/api/carrito/`, {
                    method: 'POST'
                });
                const data = await response.json();

                cartId = data.carrito;
            }

            return cartId;



        }


    }
}

// MODELOS
class ProductoModel {
    constructor() {
        const getProducts = async () => {
            const response = await fetch(`http://${url}/api/productos/all`, {
                method: 'GET'
            });
            const data = await response.json();
            data.forEach(element => {
                this.productos.push(new Producto(element));
            });
        }
        getProducts()
    }



    //MÊTODO PARA CREAR UN PRODUCTO
    createProduct = async (product) => {
        const response = await fetch(`http://${url}/api/productos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        const data = await response.json();
        return data;
    }





    //MÊTODO PARA ELIMINAR UN PRODUCTO DEL ARRAY DE PRODUCTOS
    deleteProduct = async (id) => {
        const response = await fetch(`http://${url}/api/productos/${id}`, {
            method: 'DELETE'
        })
        const data = await response.json();
        return data;
    }
    //MÊTODO PARA BUSCAR UN PRODUCTO DEL ARRAY DE PRODUCTOS
    getProductbyId = async (id) => {
        const response = await fetch(`http://${url}/api/productos/${id}`, {
            method: 'GET'
        });
        const data = await response.json();
        return JSON.parse(data);
    }

    //MÊTODO PARA ACTUALIZAR UN PRODUCTO DEL ARRAY DE PRODUCTOS
    updateProduct = async (id, product) => {
        const response = await fetch(`http://${url}/api/productos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return JSON.parse(data);
    }


    addToCart = async (id, cartId) => {
        const response = await fetch(`http://${url}/api/productos/${id}`, {
            method: 'GET'
        });
        const product = await response.json();
        console.log(product.product)

        const response2 = await fetch(`http://${url}/api/carrito/${cartId}/productos`, {
            method: 'POST',
            body: JSON.stringify(product.product),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response2.json();
        console.log(data)
        return data;
    }



}
// VIEW PRODUCTO
class AppView {
    //MÊTODO PARA CREAR LA VISTA DE AGREGAR PRODUCTO

    home(padre, datos, callback, cartId) {

        let html = document.getElementById(padre);
        let div = document.createElement('div');
        div.className = 'container';
        div.innerHTML = `
        <h4 class="card-title">Productos</h4>
        <div class="row flex-d">

                    ${datos.products.map(product => `                    
                    <div class="card">
                    <div class="card-header">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-3">
                                <img src="${product.imagen}" class="img-thumbnail" alt="">
                            </div>
                            <div class="col-md-9">
                                <h4 class="card-title">${product.nombre}</h4>
                                <p class="card-text">${product.descripcion}</p>
                                <p class="card-text">Precio: $${product.precio}</p>
                                <button class="btn btn-primary id = "btn" key ="${product.id}" >Agregar al carrito</button>
                            </div>
                        </div>
                        </div>
                    
                    </div>
                    </div>
                    `).join('')}
        </div>`
        html.appendChild(div);
        let btn = document.getElementsByClassName('btn');
        for (let i = 0; i < btn.length; i++) {
            btn[i].addEventListener('click', () => {
                callback(
                    btn[i].getAttribute('key'), cartId
                )
            });



        }




    }


    users(padre, callback) {
        const html = getElementbyId(padre);
        html.innerHTML = `<section>
                            <h1>Vista Users</h1>
                            <input type ="text"   placeholder="Nombre">
                            <input type ="number" placeholder="Precio">
                            <button id="btnEnviar">ENVIAR</button>
                          </section>        	`;
        getElementbyId("btnEnviar").addEventListener("click", callback);
    }


    //MÊTODO PARA CREAR LA VISTA DE LISTADO DE PRODUCTOS
    admin(padre, callback) {
        const html = getElementbyId(padre);
        html.innerHTML = `<section>
                            <h1>Vista Admin</h1>
                            <input type ="text"   placeholder="Nombre">
                            <input type ="number" placeholder="Precio">
                            <button id="btnEnviar">ENVIAR</button>
                          </section>        	`;
        getElementbyId("btnEnviar").addEventListener("click", callback);
    }

    //MÊTODO PARA CREAR LA VISTA DE BUSQUEDA DE PRODUCTO
    cart(padre, callback) {
        const html = getElementbyId(padre);
        html.innerHTML = `<section>
                            <h1>Vista cart</h1>
                            <input type ="text"   placeholder="Nombre">
                            <input type ="number" placeholder="Precio">
                            <button id="btnEnviar">ENVIAR</button>
                          </section>        	`;
        getElementbyId("btnEnviar").addEventListener("click", callback);
    }
}


// CONTROLLER PRODUCTO
class AppController {
    //CONSTRUCTOR DEL CONTROLADOR ASOCIANDO UN MODELO Y VISTA
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
    //MÊTODO PARA GENERAR CONSTROLAR LA VISTA, EL MODELO Y EL EVENTO AL AGREGAR UN PRODUCTO
    home(app) {
        const start = async () => {

            this.view.home(app, this.model, this.model.addToCart, cartId);
        };
        start()
            ;
    };
}


//COMPONENTE A EMPLEAR CUANDO NO SE ENCUENTRA LA PAGINA SOLICITADA
const ErrorComponent = (padre) => {
    $(padre).html("<h2>Error 404</h2>");
}