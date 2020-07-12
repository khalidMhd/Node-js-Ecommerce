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
      category.exec(function(err, data){
        res.render('client/header',{title:'Mobile',categoryRecord:data,success:''})
      })
  })

  router.post('/', function(req, res, next){
    var pages;
    var cat;
    category.exec(function(err, data){
      cat= data
    })

    var fltrName = req.body.fltrName;
    if(fltrName != '') {
        var fltrParameter = { $and: [{brand:fltrName},
        ] } }
    else {
        var fltrParameter = {}
    }

    productModel.find(fltrParameter).exec(function(err,data){
        if(err) throw err
        res.render('client/view-product',{title:'Mobile', categoryRecord:cat, prodectRecord:data,pages:pages })
    })
  })


  module.exports = router;