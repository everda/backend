
let submit = document.getElementById('submit')

function uploadImage() {
    // This assumes the form's name is `myForm`
    var form = document.getElementById("myForm");
    var formData = new FormData(form);
    fetch('uploadUserImage', {
        method: 'POST',
        body: formData
    });
}

submit.addEventListener('click', (e) => {
    e.preventDefault()
    let name = document.getElementById('name').value
    let lastname = document.getElementById('lastname').value
    let username = document.getElementById('email').value
    let direccion = document.getElementById('direccion').value
    let edad = document.getElementById('edad').value
    let prefijo = document.getElementById('prefijo').value
    let numero = document.getElementById('telefono').value
    let file = document.getElementById('file').value

    uploadImage(document.getElementById('file').files[0])

    let password = document.getElementById('password').value
    let passConfirm = document.getElementById('passwordConfirmation').value

    if (!username || !password || !file ) {
        alert('Faltan Datos')
    }
    else {
        if (password != passConfirm) {
            alert('verifique pass')
        }
        else {
            let data = { name, lastname, username, password, direccion, edad, prefijo, numero, file }
            console.log(data);
            fetch('/register', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)

            }).then(response => window.location.href = response.url);


        }
    }
})