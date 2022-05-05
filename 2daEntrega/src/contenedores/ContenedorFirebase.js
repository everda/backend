const firebase = require('firebase');
const admin = require('firebase-admin');
const serviceAccount = require('../../config/serviceAccountKey.json');

export class ContenedorFirebase {
    constructor() {
        this.firebase = firebase;
        this.admin = admin;
        this.serviceAccount = serviceAccount;
    }

    async getData() {
        try {
            let data = await this.admin.database().ref('/').once('value');
            return data.val();
        } catch (error) {
            console.log(error);
        }
    }

    async saveData(data) {
        try {
            let result = await this.admin.database().ref('/').set(data);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async getDataProduct(id) {
        
}