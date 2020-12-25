var express = require('express');
var router = express.Router();

const { database } = require('../config/helpers');

//GET All products
router.get('/', function(req, res, next) {
  database.table('products as p')
          .join([{
            table: 'categories as c',
            on: 'p.categoryId = c.id'
          }])
          .withFields([
            'p.id',
            'c.title as category',
            'p.title',
            'p.price',
            'p.description',
            'p.imageUrl'
          ])
          .sort({
            id: 1
          })
          .getAll()
          .then(prods => {
            if(prods.length > 0) {
              res.status(200).json({
                count: prods.length,
                products: prods
              });
            } else {
              res.status(200).json({
                message: "No products found!"
              })
            }
          }).catch(err => {
            console.log(err);
          });
});

//GET Single product by ID
router.get('/:id', function(req, res) {
  let productId = req.params.id;
  database.table('products as p')
           .withFields([
             'p.id',
             'p.title',
             'p.imageUrl',
             'p.description',
             'p.price',
             'p.categoryId'
           ])
           .filter({
             'p.id': productId
           })
           .get()
           .then(product => {
             if(product) {
               res.status(200).json({
                product: product
               });
             } else {
               res.json({
                 message: "No product found!"
               })
             }
           }).catch(err => {
             console.log(err);
           });
});

//POST Insert new product
router.post('/new', function(req, res) {
  let { title, imageUrl, description, price, categoryId } = req.body;
  database.table('products')
          .insert({
            title: title,
            imageUrl: imageUrl,
            description: description,
            price: price,
            categoryId: categoryId,
            createdAt: new Date(),
            updatedAt: new Date()
          }).then(newProductId => {
            if(newProductId > 0) {
              res.json({
                message: "Product successfully added!",
                success: true
              });
            } else {
              res.json({
                message: "Can't add new product!",
                success: false
              });
            }
          }).catch(err => {
            console.log(err);
          });
});

//PUT Update existing product
router.put('/update', function(req, res) {
  let {productId, title, imageUrl, description, price, categoryId} = req.body;
  if(productId != null && !isNaN(productId)) {
    database.table('products')
            .filter({
              id: productId
            })
            .update({
              title: title,
              imageUrl: imageUrl,
              description: description,
              price: price,
              categoryId: categoryId
            })
            .then(successNum => {
              if(successNum == 1) { //1 - success=true, 0 - success=false 
                res.json({
                  message: "Successfully updated a product!",
                  success: true
                });
              } else {
                res.json({
                  message: "Update not succesfully executed.",
                  success: false
                })
              }
            }).catch(err => {
              console.log(err);
            });
  }else{
    res.json({
      message: "Not a valid product ID sent!",
      success: false
    });
  }
});

//POST Remove existing product
router.post('/remove', function(req, res) {
  let { productId } = req.body;
  if(productId != null && !isNaN(productId)) {
    database.table('products')
    .filter({
      id: productId
    })
    .remove()
    .then(successNum => {
      if(successNum == 1) {
        res.json({
          message: "Product successfully removed!",
          success: true
        });
      }else{
        res.json({
          message: "Removal of product not successfully executed!",
          success: false
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }else{
    res.json({
      message: "Not a valid ID sent!",
      success: false
    });
  }
});

module.exports = router;
