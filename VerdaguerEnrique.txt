class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    getFullname() {
        return `${this.nombre} ${this.apellido}`;
    }
    addMascota(mascota) {
        this.mascotas.push(mascota);
    }
    countMasctotas() {
        return this.mascotas.length;
    }
    getBookNames() {
        return this.libros.map(libro => libro.nombre);
    }

}


const user1 = new Usuario('Enrique', 'Verdaguer', [{ nombre: 'El señor de las moscas', autor: 'William Golding' }, { nombre: 'Fundacion', autor: 'Isaac Asimov' }], ['Perro', 'Gato']);

console.log(user1.countMasctotas());
user1.addMascota('loro')
console.log(user1.getFullname());
console.log(user1.countMasctotas());
console.log(user1.getBookNames());