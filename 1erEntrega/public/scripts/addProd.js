const form = document.querySelector('#addProduct');
let btn = document.querySelector('#btnAdd');

if (btn) {
    btn.addEventListener('click', (e) => {
        console.log(form)
        e.preventDefault();
        let product = {
            title: form.title.value,
            price: form.price.value,
            stock: form.stock.value,
            code: form.code.value,
            description: form.description.value,
            thumbnail: form.image.value

        }
        console.log(product)
        fetch('http://localhost:8080/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        }).then(res => res.json())
            .then(data => {
                console.log(data)
            }
            )
    })
}