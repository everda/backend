


let url = 'localhost:8080';

console.log("hola")

let btn = document.getElementsByClassName("btn");

let goToCartBtn = document.getElementById("goToCart")
console.log(goToCartBtn);







const getCartId = async () => {
    try {
        let cartId = sessionStorage.getItem("cartId");
        if (!cartId) {
            let response = await fetch(`http://${url}/api/carts`, {
                method: 'POST'
            }
            );
            const data = await response.json();
            sessionStorage.setItem("cartId", data.cart[0].id)
            return data.cart[0].id
        }
        return cartId

    } catch (error) {
        console.log(error);
    }
}

const getProductID = async (id) => {
    try {
        console.log(id);
        let response = await fetch(`http://${url}/api/products/${id}`, {
            method: 'GET'
        });
        let data = await response.json();
        console.log(data);
        //console.log(data.product[0]);
        return data.product[0]
    } catch (error) {
        console.log(error);

    }
}



const addProduct = async (id) => {
    try {

        let cartId = await getCartId()
        console.log(cartId);
        let product = await getProductID(id);
        const response = await fetch(`http://${url}/api/carts/${cartId}/products/`, {
            method: 'POST',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json'
            }


        });
        const data = await response.json();
        return data;


    } catch (error) {
        console.log(error);
    }
}

const goToCart = async (id) => {
    try {

        goToCartBtn.href = `http://${url}/cart/${id}`

    } catch (error) {
        console.log(error);
    }
}

goToCartBtn.addEventListener('click', (e) => {
    let cartId = sessionStorage.getItem("cartId")
    console.log(cartId);
    goToCart(cartId)
})

for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", () => {
        addProduct(parseInt(btn[i].getAttribute("key")));
        console.log(parseInt(btn[i].getAttribute("key")))

    })
}