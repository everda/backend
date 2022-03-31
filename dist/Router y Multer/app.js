"use strict";

var _express = _interopRequireDefault(require("express"));

var _utils = _interopRequireDefault(require("./utils.js"));

var _Users = _interopRequireDefault(require("./Routes/Users.js"));

var _Pets = _interopRequireDefault(require("./Routes/Pets.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = 8080;
var server = app.listen(port, function () {
  console.log("Listening service correcto on port ".concat(port));
});
app.use(_express["default"].json());
app.use(_express["default"]["static"](_utils["default"] + "/public"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  console.log("hola desde el Middleware " + req.method + " - " + req.url);
  next();
});
app.use('/users', _Users["default"]);
app.use('/pets', _Pets["default"]);