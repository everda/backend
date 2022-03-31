let url = 'localhost:8080';

const getProducts = async () => {
    fetch(`http://${url}/api/productos`).then(res => res.json()).then(data => {
        return JSON.parse (data);
    }).catch(err => {
        console.log(err)
    }
    )
}
