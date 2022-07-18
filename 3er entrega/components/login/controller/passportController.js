const userService = require('../services/userService.js')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const winston = require('../../../utils/loggers/winston')
const path = require('path');

const userInstance = new userService()


passport.use('login', new LocalStrategy(async (username, password, done) => {
    try {

        let response = await userInstance.validateLogin(username, password)

        if (response.status === "ok") {
            return done(null, username)
        } else {
            return done(null, false)
        }


    } catch (error) {
        winston.errorLogger.error(error)
    }
}))

passport.use('register', new LocalStrategy({
    passReqToCallback: true
}, async (req, username, password, done) => {
    try {
        //console.log(req.body);
        let foto = req.body.file.split('\\')[2]
        let dir = path.join('/img/', foto)
        
        let data = {
            username: username, name: req.body.name, lastname: req.body.lastname, password: password, direccion: req.body.direccion,
            edad: req.body.edad,
            prefijo: req.body.prefijo,
            numero: req.body.numero,
            foto: dir,
        }
        let checkUser = await userInstance.getUsername(data.username)

        if (checkUser) {
            return done(null, false)
        } else {
            let response = await userInstance.registerUser(data)
            console.log(response);
            return done(null, username)
        }
    } catch (error) {
        console.log(error);
        winston.errorLogger.error(error)
    }

}))

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((username, done) => {
    done(null, username);
});

let loginUser = async (req, res, next) => {
    try {
        req.session.email = req.body.email;
        let response = await userInstance.validateLogin(req.body.email, req.body.pass)

        res.send(response)
    } catch (error) {
        winston.errorLogger.error(error)
    }
}

let registerUser = async (req, res, next) => {
    try {
        //console.log(req.body);
        let data = { username: req.body.user, name: req.body.name, lastname: req.body.lastname, pass: req.body.password }
        let response = await userInstance.registerUser(data)
        res.send(response)
    } catch (error) {
        winston.errorLogger.error(error)
    }
}

let logOutUser = async (req, res, next) => {
    try {

        req.session.destroy();
        next()
    } catch (error) {
        winston.errorLogger.error(error)
    }
}


let isLogin = (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect("/register");
        }
    } catch (error) {
        winston.errorLogger.error(error)
    }
}

let isNotLogin = (req, res, next) => {
    try {
        if (!req.isAuthenticated()) {
            next();
        } else {
            res.redirect("/home");
        }
    } catch (error) {
        winston.errorLogger.error(error)
    }
}

let getUserInfo = async (req, res, next) => {
    try {
        console.log(req.user);
        let response = await userInstance.getUsernameData(req.user)
        res.send({
            status: "ok",
            message: JSON.stringify(response)
        })
    } catch (error) {
        winston.errorLogger.error(error)
    }
}

module.exports = {
    loginUser, registerUser, logOutUser, isLogin, isNotLogin, passport, getUserInfo, userInstance
}