import axios from 'axios';
import Swal from 'sweetalert2'
import {initAdmin} from './admin';
import moment from 'moment'


let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter');


function updateCart(pizza){
    axios.post('/update-cart', pizza).then(res => {
        cartCounter.innerText = res.data.totalQty;
        Swal.fire({
            icon: 'success',
            title: 'Item added to cart',
            showConfirmButton: false,
            timer: 1000,
            width: 400,
          })
    }
    );}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let pizza = JSON.parse(btn.dataset.pizza);
        updateCart(pizza);
    });
});

// Remove alert message after X seconds
const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 2000)
}



// Change order status
let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
let time = document.createElement('small')

function updateStatus(order) {
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true;
    statuses.forEach((status) => {
       let dataProp = status.dataset.status
       if(stepCompleted) {
            status.classList.add('step-completed')
       }
       if(dataProp === order.status) {
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
           if(status.nextElementSibling) {
            status.nextElementSibling.classList.add('current')
           }
       }
    })

}

updateStatus(order);

// Socket
let socket = io()

// Join
if(order) {
    socket.emit('join', `order_${order._id}`)
}
let adminAreaPath = window.location.pathname
if(adminAreaPath.includes('admin')) {
    initAdmin(socket)
    socket.emit('join', 'adminRoom')
}


socket.on('orderUpdated', (data) => {
    const updatedOrder = { ...order }
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status
    updateStatus(updatedOrder)
    // new Noty({
    //     type: 'success',
    //     timeout: 1000,
    //     text: 'Order updated',
    //     progressBar: false,
    // }).show();
    Swal.fire({
        icon: 'success',
        title: 'Order updated',
        showConfirmButton: false,
        timer: 1000,
        width: 400,
      })
})
