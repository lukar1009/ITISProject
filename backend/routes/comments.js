var express = require('express');
var router = express.Router();

const { database } = require('../config/helpers');

//GET All comments
router.get('/', function(req, res, next) {
    database.table('comments')
            .withFields([
              'id',
              'title',
              'author',
              'content'
            ])
            .sort({
              id: 1
            })
            .getAll()
            .then(comments => {
              if(comments.length > 0) {
                res.status(200).json({
                  count: comments.length,
                  comments: comments
                });
              } else {
                res.status(200).json({
                  message: "No comments found!"
                })
              }
            }).catch(err => {
              console.log(err);
            });
});

//POST Insert new comment
router.post('/new', function(req, res) {
let { title, author, content } = req.body;
database.table('comments')
        .insert({
            title: title,
            author: author,
            content: content,
            createdAt: new Date(),
            updatedAt: new Date()
        }).then(newCommentId => {
            if(newCommentId > 0) {
            res.json({
                message: "Comment successfully added!",
                success: true
            });
            } else {
            res.json({
                message: "Can't add new comment!",
                success: false
            });
            }
        }).catch(err => {
            console.log(err);
        });
});

//POST Remove existing comment
router.post('/remove', function(req, res) {
let { commentId } = req.body;
if(commentId != null && !isNaN(commentId)) {
    database.table('comments')
    .filter({
    id: commentId
    })
    .remove()
    .then(successNum => {
    if(successNum == 1) {
        res.json({
        message: "Comment successfully removed!",
        success: true
        });
    }else{
        res.json({
        message: "Removal of comment not successfully executed!",
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