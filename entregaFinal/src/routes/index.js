const cartRoutes = require('../components/cart')
// const chatRoutes = require('../components/chat')
 const loginRoutes = require('../components/login')
const productsRoutes = require('../components/products')


module.exports = app => {
    cartRoutes(app);
    //chatRoutes(app);
    loginRoutes(app);
    productsRoutes(app);
    app.get('/', (req, res) => res.send('Home'));

}