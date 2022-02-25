const Desafio = (palabra, intervalo, cb) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const palabraAR = palabra.split(' ');
            let j = palabraAR.length;
            let i = 0

            const recorrePalabra = (palabra) => {
                if (i < j) {
                    console.log(palabraAR[i]);
                    i++;
                } else {
                    clearInterval(timer);
                    cb();
                }
                return j

            }
            const timer = setInterval(() => { recorrePalabra(palabra) }, intervalo || 1000);
            resolve(j)
        }, 1000);

    }
    )
}

const procesar = async () => {
    let wordcount = 0;
    let frases = ['esto es una prueba', 'Esta es otra prueba', 'Esta es la ultima prueba'];
    let intevalos = ['1000', '1000', '1000', '1000'];

    // for (let i = 0; i < frases.length; i++) {
    //     wordcount += await setTimeout(() => { Desafio(frases[i], intevalos[i], () => { console.log('Termino la frase') }) }, 8000);

    // }

    wordcount = await Desafio(frases[0], intevalos[0], () => { console.log('Termino la frase') }).then(
        wordcount += await Desafio(frases[1], intevalos[1], () => { console.log('Termino la frase') }).then(wordcount += await Desafio(frases[2], intevalos[2], () => { console.log('Termino la frase') }))
    );




    //        const timer console.log(wordcount);
    console.log("finProceso")
}

procesar()




// async function Desafio(palabra, intervalo, cb) {
//     const palabraAR = palabra.split(' ');
//     let j = palabraAR.length;
//     let i = 0

//     const recorrePalabra = (palabra) => {
//         if (i < j) {
//             console.log(palabraAR[i]);
//             i++;
//         } else {
//             clearInterval(timer);
//             cb();
//         }
//         return j

//     }
//     const timer = setInterval(() => { recorrePalabra(palabra) }, intervalo);
// return j

// }


// const end = () => {
//     console.log('Fin del intervalo')
// }



// async function proceso() {
//     let cantPalabras = 0;
//     let frases = ['Hola Mundo 1', 'esto es una prueba', 'Esta es otra prueba', 'Esta es la ultima prueba'];
//     let intevalos = ['1000', '1000', '1000', '1000'];

//     for (let i = 0; i < frases.length; i++) {

//         cantPalabras =+ Desafio(frases[i], intevalos[i], end)


//     }

//     console.log(cantPalabras)
// }

// proceso()


// // Desafio('Hola mundo 1', 1000, end())
// //         setTimeout(() => {
// //             Desafio('Hola cielo 2', 1000, end())
// //             setTimeout(() => {
// //                 Desafio('chau planeta 3', 1000, end())
// //             }, 8000);
// //         }, 3000);
// //     }, 1000);



// //recorrePalabra('Hola mundo', 1000);


