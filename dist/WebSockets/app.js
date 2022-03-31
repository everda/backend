"use strict";

var _express = _interopRequireDefault(require("express"));

var _utils = _interopRequireDefault(require("./utils.js"));

var _socket = require("socket.io");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = 8080;
var server = app.listen(port, function () {
  console.log("Listening service on port ".concat(port));
});
var io = new _socket.Server(server);
app.use("/", _express["default"]["static"](_utils["default"] + "/public"));
io.on("connection", function (socket) {
  console.log("New user connected");
  console.log("Nueva conexion");
  socket.on("disconnect", function () {
    console.log("Conexion terminada");
  });
  socket.on("mensaje", function (data) {
    console.log(socket);
    io.emit("log", "el cliente escribio: ".concat(socket.client));
  });
});
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));