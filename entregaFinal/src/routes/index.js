const cartRoutes = require('../components/cart')
// const chatRoutes = require('../components/chat')
 const loginRoutes = require('../components/login')
const productsRoutes = require('../components/products')
const navigationRoutes = require('../components/navigation')


module.exports = app => {
    cartRoutes(app);
    //chatRoutes(app);
    loginRoutes(app);
    productsRoutes(app);
    //app.get('/', (req, res) => res.send('Home'));
    navigationRoutes(app)

}