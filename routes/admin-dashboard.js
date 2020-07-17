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
    
    var jwt = require('jsonwebtoken');
    
    function checkLoginUser(req, res, next) {
        if(req.session.adminName) {
        } else{
          res.redirect('/admin')
        }
      next()
    }

  router.get('/',checkLoginUser, function(req,res, next){
      var loginadmin = req.session.adminName

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
                                loginUser:loginadmin,
                              })
                            })
                        })
                  })
            })
      })
  })

  module.exports = router;