var express = require('express');
var router = express.Router();

var categoryModel = require('../model/category');
var category =categoryModel.find({});

var productModel = require('../model/product');
var product =productModel.find({}); 

var contactModel = require('../model/contactUs')
var contact = contactModel.find({})

var orederModel = require('../model/buy-product')
var order = orederModel.find({})

var accountModel = require('../model/admin-signup')
var accout = accountModel.find({})

router.use(express.static(__dirname+"./public/"));


if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require('node-localstorage').LocalStorage;
      localStorage = new LocalStorage('./scratch');
    }
    
    var jwt = require('jsonwebtoken');
    
    function checkLoginUser(req, res, next) {
      var userToken = localStorage.getItem("userToken");
      try {
        var decoded = jwt.verify(userToken, 'loginToken');
      } catch(err) {
        res.redirect('/admin')
      }
      next()
    }

  router.get('/',checkLoginUser, function(req,res, next){
      var loginUser = localStorage.getItem('loginUser')

      categoryModel.countDocuments({}).exec(function(err,countCategory){
            if(err) throw err
            productModel.countDocuments({}).exec(function(err,countProduct){
                  if(err) throw err
                  orederModel.countDocuments({}).exec(function(err,countOrder){
                        if(err) throw err
                        contactModel.countDocuments({}).exec(function(err,countContact){
                              if(err) throw err
                              accountModel.countDocuments({}).exec(function(err,countSignup){
                                if (err) throw err
                                res.render('admin/adminDashboard',{title:' Mobile',
                                countCategory:countCategory,
                                countProduct:countProduct,
                                countOrder:countOrder,
                                countContact:countContact,
                                countSignup:countSignup,
                                loginUser:loginUser,
                              })
                            })
                        })
                  })
            })
      })
  })

  module.exports = router;