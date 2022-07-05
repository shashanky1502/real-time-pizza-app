const homeControllers = require('../app/http/controllers/homeControllers')
const authControllers = require('../app/http/controllers/authControllers')
const cartController = require('../app/http/controllers/customer/cartController')

function initRoutes(app){
    app.get('/', homeControllers().index);
    app.get('/login', authControllers().login);
    app.get('/register', authControllers().register);
    
    app.get('/cart', cartController().index);
    app.post('/update-cart',cartController().update);
}

module.exports = initRoutes;