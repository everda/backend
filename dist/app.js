"use strict";

console.log("hola");
var list = [1, 3, 5, 7, 9];
list.map(function (x) {
  return x * 2;
}).forEach(function (x) {
  return console.log(x);
});
