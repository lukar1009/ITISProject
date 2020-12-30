var express = require('express');
const { database } = require('../config/helpers');
var router = express.Router();

//GET all users
router.get('/', function(req, res, next) {
  database.table('users as u')
          .withFields([
            'u.id',
            'u.name',
            'u.email',
            'u.password',
            'u.admin'
          ])
          .getAll()
          .then(users => {
            if(users.length > 0) {
              res.status(200).json({
                data: users,
                message: "Users found!",
                success: true
              });
            } else {
              res.status(200).json({
                data: null,
                message: "No users found!",
                success: false
              })
            }
          }).catch(err => {
            console.log(err);
          });
});

//GET user by id
router.get('/:id', function(req, res) {
  let userId = req.params.id;
  database.table('users as u')
           .withFields([
             'u.id',
             'u.name',
             'u.email',
             'u.password',
             'u.admin'
           ])
           .filter({
             'u.id': userId
           })
           .get()
           .then(user => {
             if(user) {
               res.status(200).json({
                 data: user,
                 message: "User found!",
                 success: true
               });
             } else {
               res.json({
                 data: null,
                 message: "No user found!",
                 success: false
               })
             }
           }).catch(err => {
             console.log(err);
           });
});

//POST Authencticate user
router.post('/authenticate', function(req, res) {
  let {email, password} = req.body;
  if(email != null && email != undefined
    && password != null && password != undefined) {
      database.table('users as u')
              .withFields([
                'u.id',
                'u.name',
                'u.email',
                'u.password',
                'u.admin'
              ])
              .filter({
                'u.email': email,
                'u.password': password
              })
              .get()
              .then(user => {
                if(user) {
                  res.status(200).json({
                    data: user,
                    message: "Login successful!",
                    success: true
                  });
                } else {
                  res.status(200).json({
                    data: null,
                    message: "Wrong email or password!",
                    success: false
                  });
                }
              }).catch(err => {
                console.log(err);
              })
  } else {
    res.json({
      user: null,
      message: "User email or password not set!",
      success: false
    })
  }
});

//POST Insert new user
router.post('/new', function(req, res) {
  let { name, email, password, admin } = req.body;
  if(name != null && email != null && password != null && admin != null) {
    database.table('users')
            .insert({
              name: name,
              email: email,
              password: password,
              admin: admin,
              createdAt: new Date(),
              updatedAt: new Date()
            }).then(newUserId => {
              if(newUserId > 0) {
                res.json({
                  data: {
                    "id": newUserId,
                    "name": name,
                    "email": email,
                    "password": password,
                    "admin": admin
                  },
                  message: "User successfully added!",
                  success: true
                });
              } else {
                res.json({
                  data: null,
                  message: "Can't add new user!",
                  success: false
                });
              }
            }).catch(err => {
              console.log(err);
            });
  } else {
    res.json({
      data: null,
      message: "Invalid data sent!",
      success: false
    });
  }
});

//PUT Update existing user
router.put('/update', function(req, res) {
  let {userId, name, email, password, admin} = req.body;
  if(userId != null && !isNaN(userId)) {
    database.table('users')
            .filter({
              id: userId
            })
            .update({
              name: name,
              email: email,
              password: password,
              admin: admin
            })
            .then(successNum => {
              if(successNum == 1) { //1 - success=true, 0 - success=false 
                res.json({
                  message: "Successfully updated a user!",
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
      message: "Not a valid user ID sent!",
      success: false
    });
  }
});

//POST Remove existing user
router.post('/remove', function(req, res) {
  let { userId } = req.body;
  if(userId != null && !isNaN(userId)) {
    database.table('users')
    .filter({
      id: userId
    })
    .remove()
    .then(successNum => {
      if(successNum == 1) {
        res.json({
          message: "User successfully removed!",
          success: true
        });
      }else{
        res.json({
          message: "Removal of user not successfully executed!",
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
