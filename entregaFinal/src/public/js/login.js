
let submit = document.getElementById('submit')

submit.addEventListener('click', (e) => {
    e.preventDefault()
    let username = document.getElementById('email').value
    let password = document.getElementById('password').value
    if (!username || !password) {
        alert('Faltan Datos')
    }
    else {
        let data = { username, password }
        fetch('/auth/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        }).then(response => response.json())
            .then(data => {
                document.cookie = `token=${data.token}`
                // let headers = new Headers()
                // headers.append('Authoriozation', data.token)
                window.location.href = '/home'
            });





    }
})