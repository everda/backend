

let url = 'localhost:8080';

let btn = document.getElementById("sendBtn");


let cartId = sessionStorage.getItem("cartId");

const sendCart = async () => {
    try {
        console.log(cartId);
        const response = await fetch(`http://${url}/api/carts/${cartId}/confirm`, {
            method: 'get',
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

btn.addEventListener("click", () => {
    sendCart()
    window.location= `http://${url}/cart/${cartId}/confirmation`
})


// const deleteProduct = async (id) => {
//     try {
//         console.log(id, cartId);
//         const response = await fetch(`http://${url}/api/carts/${cartId}/products/${id}`, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json'
//             }


//         });
//         const data = await response.json();
//         console.log(data)
//         return data;


//     } catch (error) {
//         console.log(error);
//     }

// }



// for (let i = 0; i < btn.length; i++) {
//     btn[i].addEventListener("click", () => {
//         deleteProduct(btn[i].getAttribute("key"));
//         console.log(btn[i].getAttribute("key"))


//     })
// }