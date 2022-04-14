let url = 'localhost:8080';

console.log("hola")

const cartId = sessionStorage.getItem("cartId");

let button = document.getElementsByClassName("btn");

for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", function () {
        let id = this.getAttribute("key");
        deleteProduct(id).then(data => {

console.log(data.product.quantity)
            if (data.product.quantity === 0) {
                button[i].parentNode.parentNode.parentNode.parentNode.parentNode.remove();
                //button[i].parentNode.parentNode.remove();
            } else {
            }
        }
        )
    }
    )
}

console.log(button)

const deleteProduct = async (id) => {
    try {
        const response = await fetch(`http://${url}/api/carts/${cartId}/products/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        console.log(data)
        return data
        // if (data.message === "Product deleted") {
        //     console.log("Product deleted")



    } catch (error) {
        console.log(error);
    }
}
