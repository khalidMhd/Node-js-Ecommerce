var express = require('express');
var router = express.Router();

var categoryModel = require('../model/category');
var category =categoryModel.find({});

var productModel = require('../model/product');
var product =productModel.find({}); 

var contactModel = require('../model/contactUs')
var contact = contactModel.find({})

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

        res.render('admin/adminHeader',{title:'Mobile',success:'',loginUser:loginUser})
  })

  router.post('/',checkLoginUser, function(req, res, next){
    var loginUser = localStorage.getItem('loginUser')

    var pages;
    var cat;

    var fltrName = req.body.fltrName;
    if(fltrName != '') {
        var fltrParameter = { $and: [{brand:fltrName},
        ] } }
    else {
        var fltrParameter = {}
    }

    productModel.find(fltrParameter).exec(function(err,data){
        if(err) throw err
        res.render('admin/admin-view-product',{title:'Mobile', prodectRecord:data,pages:pages,loginUser:loginUser })
    })
    
  })

  module.exports = router;