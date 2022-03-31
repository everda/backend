"use strict";

var _express = _interopRequireDefault(require("express"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var app = (0, _express["default"])();
var port = 8080;
var server = app.listen(port, function () {
  console.log("Listening on port ".concat(port));
});
var visitRandom = 0;
var visitItem = 0;

var getItems = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var items;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.t0 = JSON;
            _context.next = 4;
            return _fs["default"].promises.readFile("./Files/productos.txt", "utf-8");

          case 4:
            _context.t1 = _context.sent;
            items = _context.t0.parse.call(_context.t0, _context.t1);
            return _context.abrupt("return", items);

          case 9:
            _context.prev = 9;
            _context.t2 = _context["catch"](0);
            console.log(_context.t2);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function getItems() {
    return _ref.apply(this, arguments);
  };
}();
/*End Point*/


app.get("/items", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var items, quantity;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return getItems();

          case 3:
            items = _context2.sent;
            quantity = items.length;
            res.send({
              items: items,
              quantity: quantity
            });
            visitItem++;
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}());
app.get("/items-random", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var items, quantity, id, item;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return getItems();

          case 3:
            items = _context3.sent;
            quantity = items.length;
            id = Math.floor(Math.random() * quantity + 1);
            item = items.find(function (item) {
              return item.id === id;
            });
            res.send({
              item: item
            });
            visitRandom++;
            _context3.next = 14;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 11]]);
  }));

  return function (_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}());
app.get("/visitas", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            try {
              res.send({
                visitas: {
                  items: visitItem,
                  item: visitRandom
                }
              });
            } catch (error) {
              console.log(error);
            }

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}());