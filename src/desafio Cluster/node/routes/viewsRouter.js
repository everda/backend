const exppress = require('express')
const viewsController = require('../controller/viewsController.js')
//const loginController = require('../components/login/controller/loginController')
const passportController  = require('../components/login/controller/passportController.js')

let viewsRouter = exppress.Router()

// viewsRouter.get('/login', loginController.isNotLogin, viewsController.getLoginPage);
// viewsRouter.get('/register', loginController.isNotLogin, viewsController.getRegisterPage);
// viewsRouter.get('/home', loginController.isLogin, viewsController.getHomePage);
// viewsRouter.get('/error', loginController.isNotLogin, viewsController.getErrorPage);
// viewsRouter.get('/logout', loginController.isNotLogin,viewsController.getLogOutPage);
viewsRouter.get('/', passportController.isNotLogin, viewsController.getLoginPage)
viewsRouter.get('/login', passportController.isNotLogin, viewsController.getLoginPage);
viewsRouter.get('/register',  passportController.isNotLogin,viewsController.getRegisterPage);
viewsRouter.get('/home',   passportController.isLogin,viewsController.getHomePage);
viewsRouter.get('/errorLogin',  passportController.isNotLogin, viewsController.getErrorLoginPage);
viewsRouter.get('/errorRegister',  passportController.isNotLogin, viewsController.getErrorRegisterPage);
viewsRouter.get('/logout',  viewsController.getLogOutPage);
viewsRouter.get('/info', passportController.isLogin, viewsController.getInfoPage)


viewsRouter.get('/chat', passportController.isLogin, viewsController.getChatPage)






viewsRouter.get('/home', viewsController.getHomePage);


module.exports = viewsRouter
