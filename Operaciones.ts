//const sumar = (a: number, b: number): number => a + b;

export class operaciones {
    constructor(number1: number, number2: number) {
        this.number1 = number1;
        this.number2 = number2;
    }
    number1: number;
    number2: number;

    sumar = () => this.number1 + this.number2;


    //     return this.number1 += this.number2;

    // }
    restar(): number {
        return this.number1 - this.number2;
    }
    multiplicar(): number {
        return this.number1 * this.number2;
    }
    dividir(): number {
        return this.number1 / this.number2;
    }
}








