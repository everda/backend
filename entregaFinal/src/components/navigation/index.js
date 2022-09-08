
let { Router } = require("express");
let navigationController = require('./controller/navigationController')
const { Islogged, IsNotlogged } = require('../../utils/JWT/jwt')


module.exports = app => {
    let router = Router()
    app.use("/", router);
    router.get('/login', Islogged, navigationController.loginPage)
    router.get('/', IsNotlogged, navigationController.homePage)
    router.get('/register', Islogged, navigationController.registerPage)
    router.get('/home', IsNotlogged, navigationController.homePage)
    router.get('/chat', IsNotlogged, navigationController.chatPage)
    router.get('/loginInfo', IsNotlogged, navigationController.getUserInfo)
    router.get('/logout', IsNotlogged, navigationController.logOutUser);
    router.get('/cart/:cid', IsNotlogged, navigationController.getCartPage);
    router.get('/cart/:cid/confirmation', IsNotlogged, navigationController.getCartConfirmationPage);
    

}