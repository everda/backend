const MongoModel = require('../mongoDAO');
const winston = require('../../../../utils/loggers/winston')
const { userSchema } = require('./userSchema')
const bcrypt = require('bcrypt')
const mailer = require('../../../../utils/mailer/nodemailer')

class UserDao extends MongoModel {
    constructor() {
        super(userSchema, 'usuario')
    }

    getUsername = async (email) => {
        try {
            let response = await this.model.findOne({ username: email })

            if (response) {
                return response
            } else {
                return null
            }
        } catch (error) {
            winston.errorLogger.error(error)
        }
    }

    // comparePassword = async (hash, pass) => {
    //     try {
    //         let validate = await bcrypt.compare(pass, hash)
    //         console.log(validate);
    //         console.log("valido");
    //         if (validate) {

    //             return {


    //                 status: "ok",
    //                 message: "user logged"
    //             }
    //         } else {
    //             return {
    //                 status: "error",
    //                 message: "Wrong Password"
    //             }
    //         }
    //     } catch (error) {
    //         winston.errorLogger.error(error)
    //     }
    // }

    // validateLogin = async (email, password) => {
    //     try {

    //         let userPass = await this.model.findOne({ "username": email })

    //         if (userPass) {
    //             let response = await this.comparePassword(userPass.password, password)

    //             return response
    //         }
    //         else {

    //             return {

    //                 status: "error",
    //                 message: "no user"
    //             }
    //         }



    //     } catch (error) {
    //         console.log(error);
    //         winston.errorLogger.error(error)
    //     }
    // }


    registerUser = async (data, hash) => {
        try {
            let { username, name, lastname, direccion,
                edad,
                prefijo,
                numero,
                file } = data
            let lastRecord = await this.model.findOne({}, {}, { sort: { 'id': -1 } });
            let id = lastRecord ? parseInt(lastRecord.id) + 1 : 1;
            let response = await this.model.create({
                id: id,
                timestamp: Date.now(),
                username: username,
                name: name,
                lastname: lastname,
                direccion: direccion,
                edad: edad,
                prefijo: prefijo,
                numero: numero,
                foto: file,
                password: hash
            });
            return response



        } catch (error) {

            winston.errorLogger.error(error)
        }


    }






}

module.exports = new UserDao()
