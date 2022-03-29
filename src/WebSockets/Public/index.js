const socket = io();
console.log("hola desde el index.js");

const input = document.getElementById("userInput");

input.addEventListener("keyup", (evt) => {
    if (evt.key === "Enter") {
        socket.emit("mensaje", input.value);
        input.value = "";
    }
});






/*Socket events*/
socket.on("log", (data) => {
    
    console.log(data);
    let div = document.createElement("div");
    div.innerHTML = data;
    document.body.appendChild(div);
}
);

