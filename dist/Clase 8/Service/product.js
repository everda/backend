"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Producto = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Producto = /*#__PURE__*/function () {
  function Producto() {
    _classCallCheck(this, Producto);

    this.products = [];
  }

  _createClass(Producto, [{
    key: "createProduct",
    value: function createProduct(id, title, price, thumbnail) {
      this.products.push({
        id: id,
        title: title,
        price: price,
        thumbnail: thumbnail
      });
    }
  }, {
    key: "getProducts",
    value: function getProducts() {
      return this.products;
    }
  }, {
    key: "getProduct",
    value: function getProduct(id) {
      var item = this.products.find(function (item) {
        return parseInt(item.id) === parseInt(id);
      });
      return item;
    }
  }]);

  return Producto;
}();

exports.Producto = Producto;