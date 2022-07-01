
let submit = document.getElementById('submit')

submit.addEventListener('click', (e) => {
    e.preventDefault()
    let name = document.getElementById('name').value
    let lastname = document.getElementById('lastname').value
    let username = document.getElementById('email').value
    let password = document.getElementById('password').value
    let passConfirm = document.getElementById('passwordConfirmation').value

    if (!username || !password) {
        alert('Faltan Datos')
    }
    else {
        if (password != passConfirm) {
            alert('verifique pass')
        }
        else {
            let data = { name, lastname, username, password }
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