
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

        // fetch('/login', {
        //     method: 'post',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)

        // }).then(response => response.json())
        //     .then(data => {
        //         if (data.status === "error") {
        //             alert(data.message)
        //         } else {
        //             console.log(data.message);
        //             window.location.href = '/home'
        //         }
        //     });
        fetch('/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        }).then(response => window.location.href = response.url);



    }
})