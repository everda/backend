"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.operaciones = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

//const sumar = (a: number, b: number): number => a + b;
var operaciones = /*#__PURE__*/function () {
  function operaciones(number1, number2) {
    _classCallCheck(this, operaciones);

    this.number1 = number1;
    this.number2 = number2;
  }

  _createClass(operaciones, [{
    key: "sumar",
    value: function sumar() {
      return this.number1 += this.number2;
    }
  }, {
    key: "restar",
    value: function restar() {
      return this.number1 - this.number2;
    }
  }, {
    key: "multiplicar",
    value: function multiplicar() {
      return this.number1 * this.number2;
    }
  }, {
    key: "dividir",
    value: function dividir() {
      return this.number1 / this.number2;
    }
  }]);

  return operaciones;
}();

exports.operaciones = operaciones;