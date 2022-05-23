const mongoose = require('mongoose');
const fs = require('fs');

class ContainerArchivo {
    constructor(filename) {
        this.filename = filename;
    }

    async getData() {
        try {
            if (fs.existsSync(this.filename)) {
                let content = fs.readFileSync(this.filename, 'utf-8');
                return content;
            } else {
                return '{"id":"mensajes", "mensajes":[]}';
            }
        } catch (error) {
            console.log(error);
        }
    }

    async saveData(data) {
        try {
            fs.writeFileSync(this.filename, JSON.stringify(data, null, '\t'), 'utf-8');
            return true;
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = ContainerArchivo;