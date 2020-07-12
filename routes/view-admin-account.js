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

var accountModel = require('../model/admin-signup')
var account = accountModel.find({})
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

    account.exec(function(err, data){

        res.render('admin/view-admin-account',{title:'Mobile',adminAcountRecord:data,
        loginUser:loginUser
     });
    })
});


  router.get('/delete/:id',checkLoginUser, function(req,res, next){
    var loginUser = localStorage.getItem('loginUser')

    accountModel.findByIdAndDelete({_id:req.params.id}).exec(function(err){
    if(err) throw err
    account.exec(function(err,data){
      res.redirect('/admin/viewAccount')
    })
    })
  })

  module.exports = router;