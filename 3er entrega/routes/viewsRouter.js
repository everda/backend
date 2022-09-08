const exppress = require('express')
const viewsController = require('../components/views/controller/viewsController')
//const loginController = require('../components/login/controller/loginController')
const passportController = require('../components/login/controller/passportController.js')
const  gzip  = require('compression');
let viewsRouter = exppress.Router()




viewsRouter.get('/', passportController.isNotLogin, viewsController.getLoginPage)
viewsRouter.get('/login', passportController.isNotLogin, viewsController.getLoginPage);
viewsRouter.get('/register', passportController.isNotLogin, viewsController.getRegisterPage);
viewsRouter.get('/home', passportController.isLogin, viewsController.getHomePage);
viewsRouter.get('/errorLogin', passportController.isNotLogin, viewsController.getErrorLoginPage);
viewsRouter.get('/errorRegister', passportController.isNotLogin, viewsController.getErrorRegisterPage);
viewsRouter.get('/logout', viewsController.getLogOutPage);
viewsRouter.get('/info', gzip(), viewsController.getInfoPage)
viewsRouter.get('/info2', viewsController.getInfoPage)
viewsRouter.get('/chat', passportController.isLogin, viewsController.getChatPage)
viewsRouter.get('/cart/:cid', passportController.isLogin, viewsController.getCartPage);
viewsRouter.get('/cart/:cid/confirmation', passportController.isLogin, viewsController.getCartConfirmationPage);


module.exports = viewsRouter