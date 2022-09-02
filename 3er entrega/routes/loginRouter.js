const exppress = require('express')
//const loginController = require('../components/login/controller/loginController.js')
let passportController = require('../components/login/controller/passportController.js')
let { passport } = require('../components/login/controller/passportController.js')
let multer = require('../utils/multer/multer')




let loginRouter = exppress.Router()


loginRouter.post('/login', passport.authenticate('login', { failureRedirect: "errorLogin", successRedirect: "home" }));
loginRouter.post('/uploadUserImage', multer.upload.single('file'), function (req, res, next) { next() });
loginRouter.post('/register', passport.authenticate('register', { failureRedirect: "errorRegister", successRedirect: "login", failureMessage: "error al verificar" }));

loginRouter.get('/logOut', passportController.logOutUser);
loginRouter.get('/loginInfo', passportController.getUserInfo)


//loginRouter.post('/register', passport.authenticate('register', { failureRedirect: "home", successRedirect: "homeS" }));



module.exports = loginRouter
