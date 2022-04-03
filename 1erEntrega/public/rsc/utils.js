

const getProducts = async () => {

    const response = await fetch(`http://${url}/api/productos/all`, {
        method: 'GET'
    });

    const data = await response.json();
    console.log(data)
    return data;

}


const getProductbyId = async (id) => {
    fetch(`http://${url}/api/productos/${id}`).then(res => res.json()).then(data => {
        return JSON.parse(data);
    }).catch(err => {
        console.log(err)
    }
    )
}



const updateProduct = async (id, product) => {
    fetch(`http://${url}/api/productos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then(data => {
        return JSON.parse(data);
    }).catch(err => {
        console.log(err)
    }
    )
}

const deleteProduct = async (id) => {
    fetch(`http://${url}/api/productos/${id}`, {
        method: 'DELETE'
    }).then(res => res.json()).then(data => {
        return JSON.parse(data);
    }).catch(err => {
        console.log(err)
    }
    )
}


