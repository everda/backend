const MongoModel = require('../../../models/mongoModel')
const { userSchema } = require('../schema/userSchema')
const bcrypt = require('bcrypt')
const { clearCookie } = require('express/lib/response')
const { async } = require('rxjs')

class UserService extends MongoModel {
    constructor() {
        super(userSchema, 'usuario')


    }

    getUsername = async (email) => {
        try {
            console.log("entro a chequear");
            console.log(email);
            let response = await this.model.findOne({ username: email })
            console.log(response);
            if (response) {
                return response.username
            } else {
                return null
            }
        } catch (error) {
            console.log(error);
        }
    }

    comparePassword = async (hash, pass) => {
        console.log("entro a compare");
        let validate = await bcrypt.compare(pass, hash)
        if (validate) {
            return {

                status: "ok",
                message: "user logged"
            }
        } else {
            return {
                status: "error",
                message: "Wrong Password"
            }
        }
    }

    validateLogin = async (email, password) => {
        try {
            let userPass = await this.model.findOne({ email: email })
            let response = await this.comparePassword(userPass.password, password)
            
            return response



        } catch (error) {
            console.log(error);
        }
    }


    registerUser = async (data) => {
        try {
            console.log("entro a registrar");
            console.log(data);
            let saltRounds = 10
            let { username, name, lastname, password } = data

            let hashedPassword = ''
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    hashedPassword = hash
                });
            });
            let response = await this.model.findOne({ username: username })
            let lastRecord = await this.model.findOne({}, {}, { sort: { 'id': -1 } });
            let id = lastRecord ? parseInt(lastRecord.id) + 1 : 1;
            

            if (response === null) {
                console.log(id, username, name, lastname, hashedPassword);
                await this.model.create({
                    id: id,
                    timestamp: Date.now(),
                    username: username,
                    name: name,
                    lastname: lastname,
                    password: hashedPassword
                });
                return {
                    status: "ok",
                    message: "user created"
                }

            }
            else {
                return { status: "error", message: "user already exists" }
            }

        } catch (error) {
            console.log(error);

        }


    }






}

module.exports = UserService
