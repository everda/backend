
let { Router } = require("express");
const config = require('../../config')
let multer = require('../../utils/multer/multer')
let userController = require('./controller/userController')
const { validateToken } = require('../../utils/JWT/jwt')
const JWT = require('../.././utils/JWT/jwt')

module.exports = app => {
    let router = Router()
    app.use("/", router);
    router.get('/login', userController.loginPage)
    router.get('/', JWT.validateToken, userController.homePage)
    router.get('/register', JWT.validateToken, userController.registerPage)
    router.get('/home', JWT.validateToken, userController.homePage)



    router.post('/auth/login', userController.loginUser);
    //router.post('/login', passport.authenticate('login', { failureRedirect: "errorLogin", successRedirect: "home" }));
    //router.post('/uploadUserImage', multer.upload.single('file'), function (req, res, next) { next() });
    router.post('/auth/register', userController.registerUser);
    router.get('/auth/logOut', userController.logOutUser);
    router.get('/auth/loginInfo', userController.getUserInfo)

}