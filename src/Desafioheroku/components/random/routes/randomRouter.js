const exppress = require('express')

const passportController  = require('../../login/controller/passportController')
const randomController = require('../controller/randomController')

let randomRouter = exppress.Router()

randomRouter.get('/', passportController.isLogin, randomController.getRandomNumbers)

module.exports = randomRouter