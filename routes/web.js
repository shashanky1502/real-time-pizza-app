const homeControllers = require('../app/http/controllers/homeControllers')
const authControllers = require('../app/http/controllers/authControllers')
const cartController = require('../app/http/controllers/customer/cartController')
const orderController = require('../app/http/controllers/customer/orderController')
const adminOrderController = require('../app/http/controllers/admin/orderController')


//middlewares
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const admin = require('../app/http/middlewares/admin')

function initRoutes(app){
    app.get('/', homeControllers().index);
    app.get('/login',guest,authControllers().login);
    app.post('/login',authControllers().postLogin);
    app.get('/register',guest,authControllers().register);
    app.post('/register', authControllers().postregister);
    app.post('/logout', authControllers().logout)
    
    app.get('/cart', cartController().index);
    app.post('/update-cart',cartController().update);

    // Customer routes
    app.post('/orders',auth, orderController().store);
    app.get('/customer/orders',auth,orderController().index);

    // Admin routes
    app.get('/admin/orders',admin, adminOrderController().index)

}


module.exports = initRoutes;