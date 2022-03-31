"use strict";

var socket = io();
console.log("hola desde el index.js");
var input = document.getElementById("userInput");
input.addEventListener("keyup", function (evt) {
  if (evt.key === "Enter") {
    socket.emit("mensaje", input.value);
    input.value = "";
  }
});
/*Socket events*/

socket.on("log", function (data) {
  console.log(data);
  var div = document.createElement("div");
  div.innerHTML = data;
  document.body.appendChild(div);
});