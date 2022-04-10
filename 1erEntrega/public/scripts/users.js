

let url = 'localhost:8080';

console.log("hola")

let btn = document.getElementsByClassName("btn");

let cartId = 0
const getCartId = async () => {
    try {
        let response = await fetch(`http://${url}/api/carts`, {
            method: 'POST'
        }
        );
        const data = await response.json();

        cartId = data.cart;
        console.log(cartId)
        return data.cart;
    } catch (error) {
        console.log(error);
    }
}


//         fetch(`http://${url}/api/carts/`, {
//             method: 'POST'
//         }).then(response => response.json())
//             .then(data => {

//                 cartId = data.cart;
//                 console.log(data)
//                 console.log(cartId)
//             }
//             )
//             .catch(error => console.log(error));
//     } catch (error) {
//         console.log(error)
//     }
// }



console.log(cartId)

const getProductID = async (id) => {
    try {
        const response = await fetch(`http://${url}/api/products/${id}`, {
            method: 'GET'
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);

    }
}

const addProduct = async (id) => {
    try {
        if (cartId === 0) {
            let cartId = await getCartId()
            console.log(cartId)

        }
        console.log(cartId)
        let product = await getProductID(id);
        console.log(product.product)
        const response = await fetch(`http://${url}/api/carts/${cartId}/products/`, {
            method: 'POST',
            body: JSON.stringify(product.product),
            headers: {
                'Content-Type': 'application/json'
            }


        });
        const data = await response.json();
        console.log(data)
        return data;


    } catch (error) {
        console.log(error);
    }
}



for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", () => {
        addProduct(btn[i].getAttribute("key"));
        console.log(btn[i].getAttribute("key"))

    })
}