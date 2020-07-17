var express = require('express');
var router = express.Router();

var categoryModel = require('../model/category');
var category =categoryModel.find({});

var productModel = require('../model/product');
var product =productModel.find({}); 

var contactModel = require('../model/contactUs')
var contact = contactModel.find({})

var buyModel = require('../model/buy-product')
var buy = buyModel.find({}).sort({created_at: -1})

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
    var loginUser = req.session.adminName

    var perPage = 12;
    var page = page || 1;
   
    buy.skip((perPage * page) - perPage)
    .limit(perPage).populate('user').populate('product').exec(function(err,data){
      if(err) throw err;
      buyModel.countDocuments({}).exec((err,count)=>{    

        res.render('admin/view-order',{title:'Mobile',orderRecord:data,
        current: page,
        pages: Math.ceil(count / perPage),
        loginUser:loginUser
      });
      
      });
    });
    buy.exec(function(err,data){
    if(err) throw err;
    });
  });

  router.get('/:page',checkLoginUser, function(req,res, next){
    var loginUser = req.session.adminName

    var perPage = 12;
    var page = req.params.page || 1;
   
    buy.skip((perPage * page) - perPage)
    .limit(perPage).populate('user').populate('product').exec(function(err,data){
      if(err) throw err;
      buyModel.countDocuments({}).exec((err,count)=>{    
        res.render('admin/view-order',{title:'Mobile',orderRecord:data,
        current: page,
        pages: Math.ceil(count / perPage),
        loginUser:loginUser
      });
      });
    });
    buy.exec(function(err,data){
    if(err) throw err;
    });
  });

  router.get('/delete/:id',checkLoginUser, function(req,res, next){
    var loginUser = req.session.adminName

    var pages;
    buyModel.findByIdAndDelete({_id:req.params.id}).exec(function(err){
    if(err) throw err
    buy.exec(function(err,data){
      res.redirect('/admin/viewOrder')
    })
    })
  })
  module.exports = router;