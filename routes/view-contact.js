var express = require('express');
var router = express.Router();

var categoryModel = require('../model/category');
var category =categoryModel.find({});

var productModel = require('../model/product');
var product =productModel.find({}); 

var contactModel = require('../model/contactUs')
var contact = contactModel.find({}).sort({created_at: -1})

var buyModel = require('../model/buy-product')
var buy = buyModel.find({})

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

    var perPage = 12;
    var page = page || 1;
    contact.skip((perPage * page) - perPage)
    .limit(perPage).exec(function(err,data){
      if(err) throw err;
      contactModel.countDocuments({}).exec((err,count)=>{   
        res.render('admin/view-contact',{title:'Mobile',contactRecord:data,
        current: page,
        pages: Math.ceil(count / perPage),
        loginUser:loginUser
      });
      });
    });
    contact.exec(function(err,data){
    if(err) throw err;
    });
  });


  router.get('/:page',checkLoginUser, function(req,res, next){
    var loginUser = localStorage.getItem('loginUser')

    var perPage = 12;
    var page = req.params.page || 1;
    var sNo= 1

    contact.skip((perPage * page) - perPage)
    .limit(perPage).exec(function(err,data){
      if(err) throw err;
      contactModel.countDocuments({}).exec((err,count)=>{    
        res.render('admin/view-contact',{title:'Mobile',contactRecord:data,
        current: page,
        pages: Math.ceil(count / perPage),
        sNo: sNo,
        loginUser:loginUser

      });
      });
    });
    contact.exec(function(err,data){
    if(err) throw err;
    });
  });


  router.get('/delete/:id',checkLoginUser, function(req,res, next){
    var loginUser = localStorage.getItem('loginUser')

    var pages;
    contactModel.findByIdAndDelete({_id:req.params.id}).exec(function(err){
    if(err) throw err
    contact.exec(function(err,data){
     res.redirect('/admin/viewContact')
    })
    })
  })

  module.exports = router;