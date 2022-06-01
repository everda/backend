const userService = require('../services/userService.js')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy


const userInstance = new userService()


passport.use('login', new LocalStrategy(async (username, password, done) => {
    try {
        console.log("entro");
        let response = await userInstance.validateLogin(username, password)
        console.log(response);
        if (response.status === "ok") {
            return done(null, username)
        } else {
            return done(null, false)
        }


    } catch (error) {
        console.log(error);
    }
}))

passport.use('register', new LocalStrategy({
    passReqToCallback: true
}, async (req, username, password, done) => {
    try {
        
        let data = { username: username, name: req.body.name, lastname: req.body.lastname, password: password }
        let checkUser = await userInstance.getUsername(data.username)
        console.log(checkUser);
        if (checkUser) {
            return done(null, false)
        } else {
            let response = await userInstance.registerUser(data)
            return done(null, username)
        }
    } catch (error) {

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
        console.log(response);
        res.send(response)
    } catch (error) {
        console.log(error);
    }
}

let registerUser = async (req, res, next) => {
    try {
        //console.log(req.body);
        let data = { username: req.body.user, name: req.body.name, lastname: req.body.lastname, pass: req.body.password }
        console.log(data);
        console.log("---------------------");
        let response = await userInstance.registerUser(data)
        res.send(response)
    } catch (error) {
        console.log(error);

    }
}

let logOutUser = async (req, res, next) => {
    try {
        console.log("entre a logout");
        req.session.destroy()
        res.redirect('/login')
    } catch (error) {

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
        console.log(error);
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
        console.log(error);
    }
}

module.exports = {
    loginUser, registerUser, logOutUser, isLogin, isNotLogin, passport
}