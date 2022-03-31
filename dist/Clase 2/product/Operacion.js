"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var operacion = function operacion(number1, number2, operador) {
  return __awaiter(void 0, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var operacionesy, operacionx;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Promise.resolve().then(function () {
              return _interopRequireWildcard(require('./Operaciones.js'));
            });

          case 2:
            operacionesy = _context.sent;
            operacionx = new operacionesy.operaciones(number1, number2);
            _context.t0 = operador;
            _context.next = _context.t0 === 'sumar' ? 7 : _context.t0 === 'restar' ? 8 : _context.t0 === 'multiplicar' ? 9 : _context.t0 === 'dividir' ? 10 : 11;
            break;

          case 7:
            return _context.abrupt("return", console.log(operacionx.sumar()));

          case 8:
            return _context.abrupt("return", console.log(operacionx.restar()));

          case 9:
            return _context.abrupt("return", console.log(operacionx.multiplicar()));

          case 10:
            return _context.abrupt("return", console.log(operacionx.dividir()));

          case 11:
            return _context.abrupt("return", 'Operador no valido');

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
};

operacion(2, 3, 'sumar');
operacion(2, 3, 'restar');
operacion(2, 3, 'multiplicar');
operacion(2, 3, 'dividir');