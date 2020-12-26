var express = require('express');
var router = express.Router();

const { database } = require('../config/helpers');

//GET All categories
router.get('/', function(req, res, next) {
    database.table('categories')
            .withFields([
              'id',
              'title'
            ])
            .sort({
              id: 1
            })
            .getAll()
            .then(categories => {
              if(categories.length > 0) {
                res.status(200).json({
                  categories: categories,
                  message: "Categories found!",
                  success: true
                });
              } else {
                res.status(200).json({
                  categories: null,
                  message: "No categories found!",
                  success: false
                })
              }
            }).catch(err => {
              console.log(err);
            });
});

module.exports = router;