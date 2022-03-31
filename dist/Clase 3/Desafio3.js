"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Desafio = function Desafio(palabra, intervalo, cb) {
  return new Promise(function (resolve) {
    var palabraAR = palabra.split(' ');
    var j = palabraAR.length;
    var i = 0;

    var recorrePalabra = function recorrePalabra() {
      if (i < j) {
        console.log(palabraAR[i]);
        i++;
      } else {
        clearInterval(timer);
        cb();
      }
    };

    var timer = setInterval(function () {
      recorrePalabra(palabra);
    }, intervalo || 1000);
    setTimeout(function () {
      resolve(j);
    }, intervalo * j + 2000);
  });
};

var procesar = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var wordCount, frases, intevalos, i;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wordCount = 0;
            frases = ['esto es una prueba', 'Esta es otra prueba', 'Esta es la ultima prueba'];
            intevalos = ['1000', '2000', '1000', '1000'];
            i = 0;

          case 4:
            if (!(i < frases.length)) {
              _context.next = 12;
              break;
            }

            _context.t0 = wordCount;
            _context.next = 8;
            return Desafio(frases[i], intevalos[i], function () {
              console.log('Termino la frase');
            });

          case 8:
            wordCount = _context.t0 += _context.sent;

          case 9:
            i++;
            _context.next = 4;
            break;

          case 12:
            console.log(wordCount);
            console.log("finProceso");

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function procesar() {
    return _ref.apply(this, arguments);
  };
}();

procesar();