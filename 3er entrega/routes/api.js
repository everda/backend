const { ModulesOption } = require('@babel/preset-env/lib/options')
const express = require('express')
const cartRoutes = require('../components/cart/routes/cartRoutes')
const productRoutes = require('../components/products/routes/productRoutes')


const apiRouter = express.Router()


apiRouter.use('/carts', cartRoutes)
apiRouter.use('/products', productRoutes)

module.exports = apiRouter