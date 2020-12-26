var express = require('express');
var router = express.Router();

const { database } = require('../config/helpers');

//GET All news
router.get('/', function(req, res, next) {
    database.table('news')
            .withFields([
              'id',
              'title',
              'author',
              'imageUrl',
              'content'
            ])
            .sort({
              id: 1
            })
            .getAll()
            .then(news => {
              if(news.length > 0) {
                res.status(200).json({
                  news: news,
                  message: "News found!",
                  success: true
                });
              } else {
                res.status(200).json({
                  news: null,
                  message: "No news found!",
                  success: false
                })
              }
            }).catch(err => {
              console.log(err);
            });
});
  
//GET Single news by ID
router.get('/:id', function(req, res) {
let newsId = req.params.id;
database.table('news')
            .withFields([
            'id',
            'title',
            'author',
            'imageUrl',
            'content'
            ])
            .filter({
            'id': newsId
            })
            .get()
            .then(news => {
            if(news) {
                res.status(200).json({
                news: news,
                message: "News found!",
                success: true
                });
            } else {
                res.json({
                  news: null,
                  message: "No news found!",
                  success: true
                });
            }
            }).catch(err => {
            console.log(err);
            });
});

//POST Insert new news
router.post('/new', function(req, res) {
let { title, author, imageUrl, content } = req.body;
database.table('products')
        .insert({
            title: title,
            author: author,
            imageUrl: imageUrl,
            content: content,
            createdAt: new Date(),
            updatedAt: new Date()
        }).then(newNewsId => {
            if(newNewsId > 0) {
            res.json({
                message: "News successfully added!",
                success: true
            });
            } else {
            res.json({
                message: "Can't add new news!",
                success: false
            });
            }
        }).catch(err => {
            console.log(err);
        });
});

//PUT Update existing news
router.put('/update', function(req, res) {
let {newsId, title, author, imageUrl, content} = req.body;
if(newsId != null && !isNaN(newsId)) {
    database.table('news')
            .filter({
            id: newsId
            })
            .update({
            title: title,
            author: author,
            imageUrl: imageUrl,
            content: content,
            updatedAt: new Date()
            })
            .then(successNum => {
            if(successNum == 1) { //1 - success=true, 0 - success=false 
                res.json({
                message: "Successfully updated news!",
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
    message: "Not a valid news ID sent!",
    success: false
    });
}
});

//POST Remove existing news
router.post('/remove', function(req, res) {
let { newsId } = req.body;
if(newsId != null && !isNaN(newsId)) {
    database.table('news')
    .filter({
    id: newsId
    })
    .remove()
    .then(successNum => {
    if(successNum == 1) {
        res.json({
        message: "News successfully removed!",
        success: true
        });
    }else{
        res.json({
        message: "Removal of news not successfully executed!",
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