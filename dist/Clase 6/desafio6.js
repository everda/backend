"use strict";

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Archivo = /*#__PURE__*/_createClass(function Archivo(nombreArchivo) {
  var _this = this;

  _classCallCheck(this, Archivo);

  _defineProperty(this, "leer", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var content;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (!_fs["default"].existsSync(_this.nombreArchivo)) {
              _context.next = 8;
              break;
            }

            _context.next = 4;
            return _fs["default"].promises.readFile(_this.nombreArchivo, 'utf-8');

          case 4:
            content = _context.sent;
            console.log(content);
            _context.next = 9;
            break;

          case 8:
            console.log([]);

          case 9:
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  })));

  _defineProperty(this, "guardar", /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(content) {
      var oldObject, id, newRecord, newContent, _id, _newRecord;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;

              if (!_fs["default"].existsSync(_this.nombreArchivo)) {
                _context2.next = 14;
                break;
              }

              _context2.t0 = JSON;
              _context2.next = 5;
              return _fs["default"].promises.readFile(_this.nombreArchivo, 'utf-8');

            case 5:
              _context2.t1 = _context2.sent;
              oldObject = _context2.t0.parse.call(_context2.t0, _context2.t1);
              id = oldObject[oldObject.length - 1].id + 1;
              newRecord = _objectSpread({
                id: id
              }, content);
              newContent = [].concat(_toConsumableArray(oldObject), [newRecord]);
              _context2.next = 12;
              return _fs["default"].promises.writeFile(_this.nombreArchivo, JSON.stringify(newContent, null, '\t'), 'utf-8');

            case 12:
              _context2.next = 18;
              break;

            case 14:
              _id = 1;
              _newRecord = [_objectSpread({
                id: _id
              }, content)];
              _context2.next = 18;
              return _fs["default"].promises.writeFile(_this.nombreArchivo, JSON.stringify(_newRecord, null, '\t'), 'utf-8');

            case 18:
              _context2.next = 23;
              break;

            case 20:
              _context2.prev = 20;
              _context2.t2 = _context2["catch"](0);
              console.log(_context2.t2);

            case 23:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 20]]);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());

  _defineProperty(this, "borrar", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;

            if (!_fs["default"].existsSync(_this.nombreArchivo)) {
              _context3.next = 6;
              break;
            }

            _context3.next = 4;
            return _fs["default"].promises.unlink(_this.nombreArchivo);

          case 4:
            _context3.next = 7;
            break;

          case 6:
            console.log('No existe el archivo');

          case 7:
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 9]]);
  })));

  this.nombreArchivo = nombreArchivo;
});

var archivo = new Archivo('./Files/productos.txt');

var procesar = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return archivo.guardar({
              title: "Producto 1",
              price: (Math.random() * 10000).toFixed(2),
              thumbnail: "Foto 1"
            });

          case 3:
            _context4.next = 5;
            return archivo.guardar({
              title: "Producto 2",
              price: (Math.random() * 10000).toFixed(2),
              thumbnail: "Foto 2"
            });

          case 5:
            _context4.next = 7;
            return archivo.guardar({
              title: "Producto 3",
              price: (Math.random() * 10000).toFixed(2),
              thumbnail: "Foto 3"
            });

          case 7:
            _context4.next = 9;
            return archivo.leer();

          case 9:
            _context4.next = 14;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 11]]);
  }));

  return function procesar() {
    return _ref4.apply(this, arguments);
  };
}();

procesar();