"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const operacion = (number1, number2, operador) => __awaiter(void 0, void 0, void 0, function* () {
    let operacionesy = yield import('./Operaciones.js');
    let operacionx = new operacionesy.operaciones(number1, number2);
    switch (operador) {
        case 'sumar':
            return console.log(operacionx.sumar());
        case 'restar':
            return console.log(operacionx.restar());
        case 'multiplicar':
            return console.log(operacionx.multiplicar());
        case 'dividir':
            return console.log(operacionx.dividir());
        default:
            return 'Operador no valido';
    }
});
operacion(2, 3, 'sumar');
operacion(2, 3, 'restar');
operacion(2, 3, 'multiplicar');
operacion(2, 3, 'dividir');
