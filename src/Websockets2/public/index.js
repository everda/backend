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
            socket.emit("mensaje", { user, message: chatBox.value.trim() });
            chatBox.value = "";
        }
    }
});


/*Socket events*/
socket.on("log", (data) => {
    let mensajes = "";
    data.forEach(log => {
        mensajes = mensajes + `<div>${log.user}: ${log.message}</div>`;
    });
    chat.innerHTML = mensajes;
});

