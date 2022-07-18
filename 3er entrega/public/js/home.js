

let url = 'localhost:8080';

console.log("hola")

let btn = document.getElementsByClassName("btn");

let goToCartBtn = document.getElementById("goToCart")
console.log(goToCartBtn);



let cartId = sessionStorage.getItem("cartId");
//console.log(cartId)
if (!cartId) {
    console.log("creo el carro");
    cartId = 0
}




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
            //console.log(cartId)
            sessionStorage.setItem("cartId", cartId)

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

const goToCart = async (id) => {
    try {
        console.log("click");
        goToCartBtn.href = `http://${url}/cart/${cartId}`
        console.log(goToCartBtn.href);
    } catch (error) {

    }
}

goToCartBtn.addEventListener('click', (e) => {

    if (cartId === 0) {
        alert("no tienes productos aun")
    } else {
        goToCart(cartId)



    }

})

for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", () => {
        addProduct(parseInt(btn[i].getAttribute("key")) + 1);
        console.log(parseInt(btn[i].getAttribute("key")) + 1)

    })
}