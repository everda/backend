// const { fromEvent, observable } = rxjs;

//import { Observable } from "rxjs";

// const { map, filter } = rxjs.operators;
const { Observable } = rxjs;


//import { observable } from "rxjs";
//const observable = require('rxjs').Observable;


const input = document.getElementsByTagName('input')[0];

addEventListener('keyup', (e) => {
    const prueba = (valor) => {
        return new Observable(observer => {
            console.log(valor);
            observer.next(valor);
            if (valor == 'error') observer.error("devolvio error");
            if (valor == 'complete') observer.complete("termino Complete");


        })
    }
})




        // const prueba = (valor) => {


        //     return new Observable(observer => {
        //         console.log(valor);
        //         observer.next(valor);
        //         if (valor == 'error') observer.error("devolvio error");
        //         if (valor == 'complete') observer.complete("termino Complete");


        //     })
        // }



        let observer = prueba(input.value).subscribe({
            next: (valor) => {
                console.log(valor);
            },
            error: (error) => {
                console.log(error);
            },
            complete: () => {
                console.log('complete');
            }
        })



// setTimeout(() => {
//     observer.unsubscribe()
// }, 5000);


