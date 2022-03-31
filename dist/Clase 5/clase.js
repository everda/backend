"use strict";

var _http = _interopRequireDefault(require("http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var server = _http["default"].createServer(function (peticion, respuesta) {
  // let hora  = new Date();
  var randomNumber = Math.floor(Math.random() * 10);
  var objeto = {
    id: randomNumber,
    title: "Producto " + randomNumber,
    price: (Math.random() * 10000).toFixed(2),
    thumbnail: "Foto " + randomNumber
  }; // respuesta.write();

  respuesta.end(JSON.stringify(objeto)); // if(hora>=6&&hora<=12) respuesta.end("Buenos días");
  // if(hora>=13&&hora<=19) respuesta.end("Buenas tardes");
  // if(hora<=5||hora>=20) respuesta.end("Buenas noches");
});

server.listen(8080, function () {
  console.log("Listening on port 8080");
});