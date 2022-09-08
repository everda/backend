
let { Router } = require("express");
const config = require('../../config')
let multer = require('../../utils/multer/multer')
let userController = require('./controller/userController')

module.exports = app => {
    let router = Router()
    app.use("/", router);
    router.post('/auth/login', userController.loginUser);
    router.post('/auth/register', userController.registerUser);
    router.get('/auth/loginInfo', userController.getUserInfo)
    router.get('/auth/logout', userController.logOutUser);

}