console.log("hola")

let forms = document.querySelectorAll('.form');
let btn = document.querySelectorAll('.btnDelete');
let btn2 = document.querySelectorAll('.btnEdit');

btn.forEach(btn => {
    // btn.addEventListener('click', function () {
    //     let id = this.getAttribute("key");
    //     console.log(id)

    // })
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(e.target.getAttribute("key"))
        let id = e.target.getAttribute("key");

        fetch('http://localhost:8080/api/products/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data)
            }
            )
        e.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
    })
})


btn2.forEach(btn => {

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        let id = e.target.getAttribute("key");

        console.log(e.target.parentElement)
        let form = e.target.parentElement

        let product = {
            title: form.title.value,
            description: form.description.value,
            price: form.price.value,
            stock: form.stock.value,
            code: form.code.value,
            thumbnail: form.thumbnail.value
        }
        fetch('http://localhost:8080/api/products/' + id, {
            method: 'PUT',
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
})




