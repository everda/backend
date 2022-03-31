"use strict";

var formatedDate = function formatedDate() {
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  return "".concat(hours, ":").concat(minutes, ":").concat(seconds);
};

var socket = io();
var chatBox = document.getElementById("chatBox");
var chat = document.getElementById("chat");
var user;
Swal.fire({
  title: "ingresa tu nombre",
  input: "text",
  inputAttributes: {
    autocapitalize: "off"
  },
  confirmButtonText: "Enviar",
  allowOutsideClick: false,
  inputValidator: function inputValidator(value) {
    if (!value) {
      return "Escribe tu nombre";
    }
  }
}).then(function (result) {
  if (result.value) {
    user = result.value; //socket.emit("nuevo usuario", user);
  }
});
chatBox.addEventListener("keyup", function (evt) {
  if (evt.key === "Enter") {
    if (chatBox.value.trim() !== "") {
      socket.emit("mensaje", {
        user: user,
        message: chatBox.value.trim(),
        date: formatedDate()
      });
      chatBox.value = "";
    }
  }
});
/*Socket events*/

socket.on("log", function (data) {
  var mensajes = "";
  data.forEach(function (log) {
    if (user === log.user) {
      mensajes += "<div class=\"row justify-content-end\">\n            <div class=\"col-md-10\">\n                <div class=\"card\">\n                <img src=\"https://image.shutterstock.com/image-vector/avatar-indian-man-call-center-600w-2126657939.jpg\" alt=\"\">\n                    <div class=\"card-body\">\n                        <h5 class=\"card-title\">".concat(log.user, "</h5>\n                        <p class=\"card-text\">").concat(log.message, "</p>\n                        <p class=\"card-text\"><small class=\"text-muted\">").concat(log.date, "</small></p>\n                    </div>\n                </div>\n            </div>\n        </div>");
    } else {
      mensajes += "<div class=\"row\">\n            <div class=\"col-md-10\">\n                <div class=\"card\">\n                <img src=\"https://image.shutterstock.com/image-vector/avatar-africanamerican-man-call-center-600w-2123619980.jpg\" alt=\"\">\n                    <div class=\"card-body\">\n                        <h5 class=\"card-title\">".concat(log.user, "</h5>\n                        <p class=\"card-text\">").concat(log.message, "</p>\n                        <p class=\"card-text\"><small class=\"text-muted\">").concat(log.date, "</small></p>\n                    </div>\n                </div>\n            </div>\n        </div>");
    }
  });
  chat.innerHTML = mensajes;
});