var express = require('express');
var router = express.Router();

var categoryModel = require('../model/category');
var category =categoryModel.find({});

var productModel = require('../model/product');
var product =productModel.find({}); 

var contactModel = require('../model/contactUs')
var contact = contactModel.find({})

router.use(express.static(__dirname+"./public/"));

  router.get('/', function(req,res, next){
    var loginUser = localStorage.getItem('loginUserInfo')

      category.exec(function(err, data){
        if (err) throw err
        res.render('client/header',{title:'Mobile',categoryRecord:data,loginUserInfo:loginUser, success:''})
      })
  })

  router.post('/', function(req, res, next){
    var loginUser = req.session.userId

    var pages;
    // var cat;
    category.exec(function(err, cat){
      if(err) throw err
      // cat= data
    

    var fltrName = req.body.fltrName;
    if(fltrName != '') {
        var fltrParameter = { $and: [{brand:fltrName},
        ] } }
    else {
        var fltrParameter = {}
    }

    productModel.find(fltrParameter).exec(function(err,data){
        if(err) throw err
        res.render('client/view-product',{title:'Mobile', categoryRecord:cat, prodectRecord:data,pages:pages,loginUserInfo:loginUser })
    })
  })
  })


  module.exports = router;