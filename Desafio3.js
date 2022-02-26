const Desafio = (palabra, intervalo, cb) => {
    return new Promise((resolve) => {

        const palabraAR = palabra.split(' ');
        let j = palabraAR.length;
        let i = 0


        const recorrePalabra = () => {
            if (i < j) {
                console.log(palabraAR[i]);
                i++;
            } else {
                clearInterval(timer);
                cb();

            }
        }
        const timer = setInterval(() => { recorrePalabra(palabra) }, intervalo || 1000);
        setTimeout(() => {
            resolve(j)
        }, (intervalo * j) + 2000);



    }
    )
}

const procesar = async () => {
    let wordCount = 0;
    let frases = ['esto es una prueba', 'Esta es otra prueba', 'Esta es la ultima prueba'];
    let intevalos = ['1000', '2000', '1000', '1000'];



    for (let i = 0; i < frases.length; i++) {
        wordCount += await Desafio(frases[i], intevalos[i], () => { console.log('Termino la frase') });
    }
    console.log(wordCount);
    console.log("finProceso")
}

procesar()

