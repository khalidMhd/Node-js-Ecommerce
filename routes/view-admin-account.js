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


var jwt = require('jsonwebtoken');

function checkLoginUser(req, res, next) {
  if(req.session.adminName) {
  } else{
    res.redirect('/admin')
  }
next()
}

router.get('/',checkLoginUser,function(req,res,next){
  var loginUser = req.session.adminName

  account.exec(function(err,data){
    if(err) throw err
    res.render('admin/view-admin-account',{title:'Mobile',adminAcountRecord:data,loginUser:loginUser })
  })
})


  router.get('/delete/:id',checkLoginUser, function(req,res, next){
    var loginUser = req.session.adminName

    accountModel.findByIdAndDelete({_id:req.params.id}).exec(function(err){
    if(err) throw err
    account.exec(function(err,data){
      res.redirect('/admin/viewAccount')
    })
    })
  })

  module.exports = router;