var express = require('express');
var router = express.Router();

const { database } = require('../config/helpers');

//GET All orders
router.get('/', function(req, res, next) {
    database.table('orders as o')
            .join([{
              table: 'orderdetails as od',
              on: 'o.id = od.orderId'
            },
            {
                table: 'users as u',
                on: 'u.id = o.userId'
            },
            {
                table: 'products as p',
                on: 'od.productId = p.id'
            }])
            .withFields([
              'o.id',
              'u.id as userId',
              'u.name as userName',
              'p.id as productId',
              'p.name as productName',
              'od.quantity',
              'o.deliveryAddress',
              'od.createdAt'
            ])
            .sort({
              id: 1
            })
            .getAll()
            .then(orders => {
              if(orders.length > 0) {
                res.status(200).json({
                  data: orders,
                  message: "Orders found!",
                  success: true
                });
              } else {
                res.status(200).json({
                  data: null,
                  message: "No orders found!",
                  success: false
                })
              }
            }).catch(err => {
              console.log(err);
            });
  });
  
//GET Single orders by ID
router.get('/:id', function(req, res) {
let orderId = req.params.id;
database.table('orders as o')
        .join([{
            table: 'orderdetails as od',
            on: 'o.id = od.orderId'
        }])
            .withFields([
            'o.id',
            'o.userId',
            'o.deliveryAddress',
            'od.productId',
            'od.quantity',
            'od.createdAt'
            ])
            .filter({
            'o.id': orderId
            })
            .get()
            .then(order => {
            if(order) {
                res.status(200).json({
                data: order,
                message: "Order found!",
                success: true
                });
            } else {
                res.json({
                  data: null,
                  message: "No order found!",
                  success: false
                })
            }
            }).catch(err => {
            console.log(err);
            });
});

//POST Insert new order
router.post('/new', function(req, res) {
    let { userId, deliveryAddress, productId, quantity } = req.body;
    database.table('orders')
        .insert({
            userId: userId,
            deliveryAddress: deliveryAddress,
            createdAt: new Date(),
            updatedAt: new Date()
        }).then(newOrderId => {
            if(newOrderId > 0) {
                database.table('orderdetails')
                        .insert({
                            orderId: newOrderId,
                            productId: productId,
                            quantity: quantity,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        }).then(newOrderDetailsId => {
                            if(newOrderDetailsId > 0) {
                                res.json({
                                    message: "New order successfully inserted!",
                                    success: true
                                });
                            } else {
                                res.json({
                                    message: "Can't add new order details!",
                                    success: false
                                });
                            }
                        }).catch(err => {
                            console.log(err);
                        })
            } else {
            res.json({
                message: "Can't add new order!",
                success: false
            });
            }
        }).catch(err => {
            console.log(err);
        });
});

module.exports = router;