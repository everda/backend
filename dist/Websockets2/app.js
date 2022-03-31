"use strict";

var _express = _interopRequireDefault(require("express"));

var _socket = require("socket.io");

var _utils = _interopRequireDefault(require("./utils.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = process.env.PORT || 8080;
var server = app.listen(port, function () {
  console.log("Listening service on port ".concat(port));
});
var io = new _socket.Server(server);
var chatLog = [];
io.on("connection", function (socket) {
  socket.on("mensaje", function (data) {
    //console.log(data)
    //console.log(util.formatedDate())
    chatLog.push(data); //agrego palabra al chat

    io.emit("log", chatLog); //io es global, socket es por el cliente que me envio
  });
});
app.use("/", _express["default"]["static"](_utils["default"].__dirname + "/public"));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));