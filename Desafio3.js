const Desafio = (palabra, intervalo, cb) => {
    return new Promise((resolve) => {
        
            const palabraAR = palabra.split(' ');
            let j = palabraAR.length;
            let i = 0
            let flag = false;

            const recorrePalabra = () => {
                if (i < j) {
                    console.log(palabraAR[i]);
                    i++;
                } else {
                    clearInterval(timer);
                    cb();
                    flag = true
                }
            }
            const timer = setInterval(() => { recorrePalabra(palabra) }, intervalo || 1000);
            setTimeout(() => {
                resolve([flag, j])
            }, (intervalo * j) + 1000);

        

    }
    )
}

const procesar = async () => {
    let wordcount = 0;
    let frases = ['esto es una prueba', 'Esta es otra prueba', 'Esta es la ultima prueba'];
    let intevalos = ['1000', '2000', '1000', '1000'];
    let flag = false;
    let resolve = [];

    for (let i = 0; i < frases.length; i++) {
        if (!flag) {
            resolve = await Desafio(frases[i], intevalos[i], () => { console.log('Termino la frase') });
            flag = resolve[0];

            wordcount += resolve[1];

        }

    }
    console.log(wordcount);
    console.log("finProceso")
}

procesar()

