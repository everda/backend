const operacion = async (number1: number, number2: number, operador: String) => {
    let operacionesy = await import('./Operaciones.js');
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

};


operacion(2, 3, 'sumar');
operacion(2, 3, 'restar');
operacion(2, 3, 'multiplicar');
operacion(2, 3, 'dividir');


