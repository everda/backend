const winston = require('../../../utils/loggers/winston')
const userService = require('../services/userService')
const { authSchema, authRegSchema } = require('../../../utils/validator/validationSchema')
const { generateToken, validateToken, generateRefreshToken } = require('../../../utils/JWT/jwt')



class userController {
    async registerUser(req, res, next) {
        try {

            let response = await authRegSchema.validateAsync(req.body)
            if (response) {

                let response = await userService.registerUser(req.body)
                //console.log(response);
                if (response.status === "ok") {
                    let token = await generateToken(username)
                    let refreshToken = await generateRefreshToken(username)
                    res.cookie('token', token)
                    res.cookie('refresh_token', refreshToken)
                    res.send({
                        message: 'User logged',
                        user: response,
                        //    token: token,
                        //refreshToken: refreshToken
                    })


                }
                else { res.send(response) }

            }
            // let response = await userService.registerUser(data)

        } catch (error) {
            console.log(error);
            winston.errorLogger.error(error)
        }
    }

    async loginUser(req, res, next) {
        try {

            let { username, password } = req.body
            let response = await authSchema.validateAsync(req.body)
            if (response) {
                let response = await userService.validateLogin(username, password)
                //console.log(response);
                if (response.status === "ok") {
                    let token = await generateToken(username)
                    let refreshToken = await generateRefreshToken(username)
                    console.log(token);
                    res.cookie('token', token)
                    res.cookie('refresh_token', refreshToken)
                    res.send({
                        message: 'User logged',
                        user: response,
                        token: token,

                        //refreshToken: refreshToken
                    })
                }
                else {
                    res.send(response)

                }

            }
        } catch (error) {
            console.log(error);
            if (error.isJoi === true) error.status = 422
            winston.errorLogger.error(JSON.stringify(error))
            next(error)
        }
    }

    async logOutUser(req, res, next) {
        try {
            res.clearCookie("token");
            res.clearCookie("refresh_token");
            res.redirect('/logout')
        } catch (error) {
            winston.errorLogger.error(error)
        }
    }


    // async isLogin(req, res, next) {
    //     try {
    //         if (req.isAuthenticated()) {
    //             next();
    //         } else {
    //             res.redirect("/register");
    //         }
    //     } catch (error) {
    //         winston.errorLogger.error(error)
    //     }
    // // }

    // isNotLogin = (req, res, next) => {
    //     try {
    //         if (!req.isAuthenticated()) {
    //             next();
    //         } else {
    //             res.redirect("/home");
    //         }
    //     } catch (error) {
    //         winston.errorLogger.error(error)
    //     }
    // }

    async getUserInfo(req, res, next) {
        try {
            //console.log(req.user);
            let response = await userService.getUsername(req.user)
            res.send({
                message: "ok",
                user: JSON.stringify(response)
            })
        } catch (error) {
            winston.errorLogger.error(error)
        }
    }


}
module.exports = new userController()