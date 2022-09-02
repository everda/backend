const winston = require('../../../utils/loggers/winston')
const userService = require('../services/userService')
const { authSchema, authRegSchema } = require('../../../utils/validator/validationSchema')
const { generateToken, validateToken } = require('../../../utils/JWT/jwt')
const { isJsxClosingFragment, CompletionTriggerKind } = require('typescript')


class userController {
    async registerUser(req, res, next) {
        try {

            let response = await authRegSchema.validateAsync(req.body)
            if (response) {

                let response = await userService.registerUser(req.body)
                console.log(response);
                if (response.status === "ok") {
                    let token = await generateToken(req.body.username)
                    res.setHeader("autorization", "bearer " + token);


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
                console.log(response);
                if (response.status === "ok") {
                    
                    let token = await generateToken(username)
                    console.log(token);
                    
                    res.send({
                        message: 'User logged',
                        user: response,
                        token: token
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
            req.session.destroy();
            next()
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
            let response = await userService.getUsername(req.user)
            res.send({
                message: "ok",
                user: JSON.stringify(response)
            })
        } catch (error) {
            winston.errorLogger.error(error)
        }
    }


    async loginPage(req, res, next) {
        try {
            
            res.render('login.handlebars', { title: 'Login Ecommerce' })
        } catch (error) {
            winston.errorLogger.error(error)
        }
    }


    async registerPage(req, res) {
        try {
            res.render('register.handlebars', { title: 'Register Ecommerce' })
        } catch (error) {
            winston.errorLogger.error(error)
        }
    }

    async homePage(req, res) {
        try {
            console.log("hola");
            res.render('home.handlebars', { title: 'Register Ecommerce' })
        } catch (error) {
            winston.errorLogger.error(error)
        }
    }
}
module.exports = new userController()