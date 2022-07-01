const exppress = require('express')
//const loginController = require('../components/login/controller/loginController.js')
let passportController = require('../components/login/controller/passportController.js')
let { passport } = require('../components/login/controller/passportController.js')




let loginRouter = exppress.Router()


loginRouter.post('/login', passport.authenticate('login', { failureRedirect: "errorLogin", successRedirect: "home" }) );
loginRouter.post('/register', passport.authenticate('register', { failureRedirect: "errorRegister", successRedirect: "login", failureMessage:"error al verificar"}));
loginRouter.use('/logOut', passportController.logOutUser);



//loginRouter.post('/register', passport.authenticate('register', { failureRedirect: "home", successRedirect: "homeS" }));



module.exports = loginRouter
