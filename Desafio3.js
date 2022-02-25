const Desafio = (palabra, intervalo, cb) => {
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

    }



    const timer = setInterval(() => { recorrePalabra(palabra) }, intervalo);


}

const end = () => {
    console.log('Fin del programa');
}

setTimeout(() => {
    Desafio('Hola mundo 1', 1000, end)
    setTimeout(() => {
        Desafio('Hola cielo 2', 1000, end)
        setTimeout(() => {
            Desafio('chau planeta 3', 1000, end)
        }, 8000);
    }, 3000);
}, 1000);






//recorrePalabra('Hola mundo', 1000);


