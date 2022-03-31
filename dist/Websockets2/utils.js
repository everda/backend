"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = exports["default"] = void 0;

var _url = require("url");

var _path = require("path");

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _filename = (0, _url.fileURLToPath)(import.meta.url);

var _dirname = (0, _path.dirname)(_filename);

var formatedDate = function formatedDate() {
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  return "[".concat(day, "/").concat(month, "/").concat(year, " ").concat(hours, ":").concat(minutes, ":").concat(seconds, "]");
};

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, _dirname + "/public/img");
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

var upload = (0, _multer["default"])({
  storage: storage
});
exports.upload = upload;
var _default = {
  __dirname: _dirname,
  formatedDate: formatedDate
};
exports["default"] = _default;