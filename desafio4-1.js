// const { fromEvent, observable } = rxjs;

//import { Observable } from "rxjs";

// const { map, filter } = rxjs.operators;
const { Observable } = rxjs;
const { fromEvent } = rxjs;
const { map, filter } = rxjs.operators;
const { finalize } = rxjs.operators;


//import { observable } from "rxjs";
//const observable = require('rxjs').Observable;


let text = document.getElementsByTagName('input')[0]
let span = document.getElementsByTagName('span')[0]
let leyenda = document.getElementsByTagName('p')[0]


const input = fromEvent(text, 'keyup').pipe(
    map(val => {
        return val.target.value;
    }
    ),
);






let observer = {
    next: (valor) => {
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
    error: (error) => {
        console.log(error);
        document.getElementsByTagName('input')[0].value = "";
        leyenda.innerHTML = "Completado por error";
    }
}

const subscription = input.subscribe(observer);



 setTimeout(() => {
    subscription.unsubscribe()
    document.getElementsByTagName('input')[0].value = "";
    leyenda.innerHTML = "Completado por tiempo";
    span.innerHTML="";

 }, 5000);


