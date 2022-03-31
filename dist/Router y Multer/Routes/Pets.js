"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var pets = [];

var Router = _express["default"].Router();

Router.get('/', function (req, res) {
  res.send(pets);
});
Router.post('/', function (req, res) {
  var pet = req.body;
  pets.push(pet);
  res.send(pet);
});
Router.put('/:id', function (req, res) {
  var id = parseInt(req.params.id);
  var pet = pets.find(function (pet) {
    return pet.id === id;
  });

  if (pet) {
    var _req$body = req.body,
        name = _req$body.name,
        age = _req$body.age,
        type = _req$body.type,
        description = _req$body.description;
    pet.name = name;
    pet.age = age;
    pet.type = type;
    pet.description = description;
    res.send(pet);
  } else {
    res.status(400).send({
      error: "Pet not found"
    });
  }
});
Router["delete"]('/:id', function (req, res) {
  var id = parseInt(req.params.id);
  var pet = pets.find(function (pet) {
    return pet.id === id;
  });

  if (pet) {
    pets = pets.filter(function (pet) {
      return pet.id !== id;
    });
    res.send(pet);
  } else {
    res.status(400).send({
      error: "Pet not found"
    });
  }
});
var _default = Router;
exports["default"] = _default;