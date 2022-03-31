"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Router = _express["default"].Router();

var users = [];
Router.get("/", function (req, res) {
  res.send(users);
});
Router.post("/", _utils.upload.single('file'), function (req, res) {
  console.log(req.file);
  var user = req.body;
  users.push(user);
  res.send(user);
});
Router.get("/:id", function (req, res) {
  var id = parseInt(req.params.id);
  var user = users.find(function (user) {
    return user.id === id;
  });

  if (user) {
    res.send(user);
  } else {
    res.status(400).send({
      error: "User not found"
    });
  }
});
Router.put("/:id", function (req, res) {
  var id = parseInt(req.params.id);
  var user = users.find(function (user) {
    return user.id === id;
  });

  if (user) {
    var _req$body = req.body,
        name = _req$body.name,
        email = _req$body.email;
    user.name = name;
    user.email = email;
    res.send(user);
  } else {
    res.status(400).send({
      error: "User not found"
    });
  }
});
Router["delete"]("/:id", function (req, res) {
  var id = parseInt(req.params.id);
  var user = users.find(function (user) {
    return user.id === id;
  });

  if (user) {
    users = users.filter(function (user) {
      return user.id !== id;
    });
    res.send(user);
  } else {
    res.status(400).send({
      error: "User not found"
    });
  }
});
var _default = Router;
exports["default"] = _default;