var express = require('express');
var router = express.Router();

const { database } = require('../config/helpers');

/* GET all products. */
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



module.exports = router;
