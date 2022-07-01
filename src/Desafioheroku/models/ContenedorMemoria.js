class ContenedorMemoria {
    constructor() {
        this.array = [];
    }

    getData() {
        return this.array;
    }

    saveData(data) {
        this.array = data;
        return this.array;
    }

}

module.exports = ContenedorMemoria;