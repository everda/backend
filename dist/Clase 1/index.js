"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Usuario = /*#__PURE__*/function () {
  function Usuario(nombre, apellido, libros, mascotas) {
    _classCallCheck(this, Usuario);

    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  _createClass(Usuario, [{
    key: "getFullname",
    value: function getFullname() {
      return "".concat(this.nombre, " ").concat(this.apellido);
    }
  }, {
    key: "addMascota",
    value: function addMascota(mascota) {
      this.mascotas.push(mascota);
    }
  }, {
    key: "countMasctotas",
    value: function countMasctotas() {
      return this.mascotas.length;
    }
  }, {
    key: "getBookNames",
    value: function getBookNames() {
      return this.libros.map(function (libro) {
        return libro.nombre;
      });
    }
  }]);

  return Usuario;
}();

var user1 = new Usuario('Enrique', 'Verdaguer', [{
  nombre: 'El señor de las moscas',
  autor: 'William Golding'
}, {
  nombre: 'Fundacion',
  autor: 'Isaac Asimov'
}], ['Perro', 'Gato']);
console.log(user1.countMasctotas());
user1.addMascota('loro');
console.log(user1.getFullname());
console.log(user1.countMasctotas());
console.log(user1.getBookNames());