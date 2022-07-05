const homeControllers = require('../app/http/controllers/homeControllers')
const authControllers = require('../app/http/controllers/authControllers')
const cartController = require('../app/http/controllers/customer/cartController')

//middlewares
const guest = require('../app/http/middlewares/guest')

function initRoutes(app){
    app.get('/', homeControllers().index);
    app.get('/login',guest,authControllers().login);
    app.post('/login',authControllers().postLogin);
    app.get('/register',guest,authControllers().register);
    app.post('/register', authControllers().postregister);
    app.post('/logout', authControllers().logout)
    
    app.get('/cart', cartController().index);
    app.post('/update-cart',cartController().update);
}

module.exports = initRoutes;