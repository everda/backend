//const sumar = (a: number, b: number): number => a + b;
export class operaciones {
    constructor(number1, number2) {
        this.number1 = number1;
        this.number2 = number2;
    }
    sumar() {
        return this.number1 += this.number2;
    }
    restar() {
        return this.number1 - this.number2;
    }
    multiplicar() {
        return this.number1 * this.number2;
    }
    dividir() {
        return this.number1 / this.number2;
    }

}
