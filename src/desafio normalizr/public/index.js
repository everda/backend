console.log("hola")


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
let chatMessages = document.getElementById("chat-messages");
let login = document.getElementById("login");
let compresionTag = document.getElementById("compresion");
let author = {};

login.addEventListener("click", (e) => {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let lastName = document.getElementById("lastname").value;
    let email = document.getElementById("email").value;
    let age = document.getElementById("age").value;
    let avatar = document.getElementById("avatar").value;
    let alias = document.getElementById("alias").value;
    chat.style.display = 'none';
    author = { name, lastName, email, age, avatar, alias }
    startChat()
}
);



// Swal.fire({
//     title: "ingresa tu nombre",
//     input: "text",
//     inputAttributes: {
//         autocapitalize: "off"
//     },
//     confirmButtonText: "Enviar",
//     allowOutsideClick: false,
//     inputValidator: (value) => {
//         if (!value) {
//             return "Escribe tu nombre";
//         }
//     }
// }).then((result) => {
//     if (result.value) {
//         user = result.value;
//         //socket.emit("nuevo usuario", user);
//         chat.appendChild(document.createElement("div")).innerHTML = `<div class="user">${user}</div>
//         `;

//     }
// });


chatBox.addEventListener("keyup", (evt) => {
    evt.preventDefault();
    if (evt.key === "Enter") {
        if (chatBox.value.trim() !== "") {
            console.log(chatBox.value)
            socket.emit("mensaje", {
                author: author, text: chatBox.value.trim()
            });
            chatBox.value = "";
        }


    }

});
const authorSchema = new normalizr.schema.Entity('author', {}, { idAttribute: 'email' });
const chatSchema = new normalizr.schema.Entity('chat', { mensajes: [{ author: authorSchema }] });

const startChat = () => {
    /*Socket events*/
    console.log("entro")
    socket.emit('init', author);
    socket.on("log", (data) => {
        let mensajes = "";

        let chat = normalizr.denormalize(data.result, chatSchema, data.entities);
        console.log(chat)
        console.log(JSON.stringify(data).length )
        console.log( JSON.stringify(chat).length)
        let compression = (1 - (JSON.stringify(data).length / JSON.stringify(chat).length)) * 100
        compresionTag.innerHTML = `<h2> la compresion fue de ${compression.toFixed(2)}%</h2>`


        chat.mensajes.forEach(log => {
            console.log(log.author.alias)
            if (author.email === log.author.email) {
                mensajes += `<div class="row justify-content-end">
            <div class="col-md-10">
                <div class="card">
                <img src="https://image.shutterstock.com/image-vector/avatar-indian-man-call-center-600w-2126657939.jpg" alt="">
                    <div class="card-body">
                        <h5 class="card-title">${log.author.alias}</h5>
                        <p class="card-text">${log.text}</p>
                        
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
                        <h5 class="card-title">${log.author.alias}</h5>
                        <p class="card-text">${log.text}</p>
                    </div>
                </div>
            </div>
        </div>`;
            }
        });


        chatMessages.innerHTML = mensajes;
    });
}

