
let formatedDate = () => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
}



let socket = io();

let chatBox = document.getElementById("chatBox");
let chat = document.getElementById("chat");
let user;



Swal.fire({
    title: "ingresa tu nombre",
    input: "text",
    inputAttributes: {
        autocapitalize: "off"
    },
    confirmButtonText: "Enviar",
    allowOutsideClick: false,
    inputValidator: (value) => {
        if (!value) {
            return "Escribe tu nombre";
        }
    }
}).then((result) => {
    if (result.value) {
        user = result.value;
        //socket.emit("nuevo usuario", user);
    }
});

chatBox.addEventListener("keyup", (evt) => {
    if (evt.key === "Enter") {
        if (chatBox.value.trim() !== "") {
            socket.emit("mensaje", { user, message: chatBox.value.trim(), date: formatedDate() });
            chatBox.value = "";
        }
    }
});


/*Socket events*/
socket.on("log", (data) => {
    let mensajes = "";
    data.forEach(log => {
        if (user === log.user) {
            mensajes += `<div class="row justify-content-end">
            <div class="col-md-10">
                <div class="card">
                <img src="https://image.shutterstock.com/image-vector/avatar-indian-man-call-center-600w-2126657939.jpg" alt="">
                    <div class="card-body">
                        <h5 class="card-title">${log.user}</h5>
                        <p class="card-text">${log.message}</p>
                        <p class="card-text"><small class="text-muted">${log.date}</small></p>
                    </div>
                </div>
            </div>
        </div>`;
        } else {
            mensajes += `<div class="row">
            <div class="col-md-10">
                <div class="card">
                <img src="https://image.shutterstock.com/image-vector/avatar-africanamerican-man-call-center-600w-2123619980.jpg" alt="">
                    <div class="card-body">
                        <h5 class="card-title">${log.user}</h5>
                        <p class="card-text">${log.message}</p>
                        <p class="card-text"><small class="text-muted">${log.date}</small></p>
                    </div>
                </div>
            </div>
        </div>`;
        }
    });


    chat.innerHTML = mensajes;
});

