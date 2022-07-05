const Order = require('../../../models/order');
const moment = require('moment');


function orderContoller() {
    return {
        store(req, res) {
            //Validate request
            const { phone, address } = req.body;
            console.log(req.body);
            if (!phone || !address) {
                req.flash('error', 'Please fill in all fields');
                return res.redirect('/cart');
            }

            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone,
                address
            })
            order.save().then(() => {
                req.flash('success', 'Order placed successfully');
                delete req.session.cart;
                return res.redirect('customer/orders');

            }).catch(err => {
                req.flash('err', 'Something went wrong');
                return res.redirect('/cart');
            });
        },
        async index(req, res) {
            const orders = await Order.find({ customerId: req.user._id },
                null,
                { sort: { 'createdAt': -1 } }); //sort the orders in descending order
                res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
                res.render('customer/orders', { orders: orders, moment: moment });    
        }
    };
}

module.exports = orderContoller;
