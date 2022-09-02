const dao = require('../../../models')
const bcrypt = require('bcrypt')
const winston = require('../../../utils/loggers/winston')
const mailer = require('../../../utils/mailer/nodemailer')

class userService {

    async getUsername(email) {
        try {
            let response = await dao.userDao.getUsername(email)
            if (response) {
                return response.username
            } else {
                return null
            }
        } catch (error) {
            winston.errorLogger.error(error)
        }
    }

    async validateLogin(username, password) {
        try {

            let userPass = await dao.userDao.getUsername(username)
            if (userPass) {
                let validate = await bcrypt.compare(password, userPass.password)
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
            else {
                return {
                    status: "error",
                    message: "no user"
                }
            }



        } catch (error) {
            console.log(error);
            winston.errorLogger.error(error)
        }
    }



    async registerUser(data) {
        try {
            let saltRounds = 10
            let { password } = data
            console.log(typeof (password));
            let hashedPassword = await new Promise((resolve, reject) => {
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    if (err) reject(err)
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) reject(err)
                        resolve(hash)
                    });
                });
            })

            console.log(hashedPassword);
            let checkUser = await dao.userDao.getUsername(data.username)
            if (!checkUser) {
                let response = await dao.userDao.registerUser(data, hashedPassword)
                mailer.sendMail(data.username)
                return {
                    status: "ok",
                    user: response
                }
            } else {
                return {
                    status: "error",
                    message: "Usuario ya existe"
                }
            }
        } catch (error) {
            winston.errorLogger.error(error)
        }


    }

}

module.exports = new userService()
