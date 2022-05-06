const fs = require('fs');

 class ContenedorArchivo {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
        console.log("entro")
    }

    async getData() {
        try {
            if (fs.existsSync(this.nombreArchivo)) {
                let content = fs.readFileSync(this.nombreArchivo, 'utf-8');
                return content;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    async saveData(data) {
        try {
            fs.writeFileSync(this.nombreArchivo, JSON.stringify(data, null, '\t'), 'utf-8');
            return true;
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = ContenedorArchivo;