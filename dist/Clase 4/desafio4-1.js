"use strict";

// const { fromEvent, observable } = rxjs;
//import { Observable } from "rxjs";
// const { map, filter } = rxjs.operators;
var _rxjs = rxjs,
    Observable = _rxjs.Observable;
var _rxjs2 = rxjs,
    fromEvent = _rxjs2.fromEvent;
var _rxjs$operators = rxjs.operators,
    map = _rxjs$operators.map,
    filter = _rxjs$operators.filter;
var finalize = rxjs.operators.finalize; //import { observable } from "rxjs";
//const observable = require('rxjs').Observable;

var text = document.getElementsByTagName('input')[0];
var span = document.getElementsByTagName('span')[0];
var leyenda = document.getElementsByTagName('p')[0];
var input = fromEvent(text, 'keyup').pipe(map(function (val) {
  return val.target.value;
}));
var observer = {
  next: function next(valor) {
    if (valor === 'complete') {
      console.log('complete');
      text.value = "";
      leyenda.innerHTML = "Completado por proceso";
      subscription.unsubscribe(observer);
    } else {
      console.log("valor: ", valor);
      span.innerHTML = valor.split('').reverse().join('');
    }
  },
  error: function error(_error) {
    console.log(_error);
    document.getElementsByTagName('input')[0].value = "";
    leyenda.innerHTML = "Completado por error";
  }
};
var subscription = input.subscribe(observer);
setTimeout(function () {
  subscription.unsubscribe();
  document.getElementsByTagName('input')[0].value = "";
  leyenda.innerHTML = "Completado por tiempo";
  span.innerHTML = "";
}, 5000);