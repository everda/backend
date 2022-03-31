"use strict";

var _express = _interopRequireDefault(require("express"));

var _product = require("./Service/product.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = 8080;
var server = app.listen(port, function () {
  console.log("Listening on port ".concat(port));
});
var newId = 0;
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
var instancia = new _product.Producto();
app.get("/api/productos/", function (req, res) {
  var items = instancia.getProducts();

  if (items.length > 0) {
    res.send(JSON.stringify(items));
  } else {
    res.status(400).send({
      error: "No hay productos cargados"
    });
  }
});
app.get("/api/productos/:id", function (req, res) {
  var id = parseInt(req.params.id);
  var item = instancia.getProduct(id);

  if (item) {
    res.send(item);
  } else {
    res.status(400).send({
      error: "Producto no encontrado"
    });
  }
});
app.post("/api/productos/guardar", function (req, res) {
  var id = newId;
  var _req$body = req.body,
      title = _req$body.title,
      price = _req$body.price,
      thumbnail = _req$body.thumbnail;
  instancia.createProduct(id, title, price, thumbnail);
  newId++;
  res.send({
    message: "Producto guardado",
    producto: instancia.getProduct(id)
  });
});