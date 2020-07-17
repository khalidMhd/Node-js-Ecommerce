var express = require('express');
var router = express.Router();

var categoryModel = require('../model/category');
var category =categoryModel.find({});

var productModel = require('../model/product');
var product =productModel.find({}); 

var contactModel = require('../model/contactUs')
var contact = contactModel.find({})

var signupModel = require('../model/admin-signup')
var signup = signupModel.find({})

router.use(express.static(__dirname+"./public/"));


var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

function checkLoginUser(req, res, next) {
  if(req.session.adminName) {
  } else{
    res.redirect('/admin')
  }
next()
}


function checkEmail(req, res, next){
    var email= req.body.email;
    var checkExitEmail = signupModel.findOne({email:email});
    checkExitEmail.exec((err, data)=>{
      if (err) throw err;
      if (data) {
        return res.render('admin/signup', { title: 'Mobile', msg:"Email Already Exit" });
      }
      next()
    })
  }
  
  function checkUserName(req, res, next){
    var userName= req.body.uname;
    var checkExitUserName = signupModel.findOne({username:userName});
    checkExitUserName.exec((err, data)=>{
      if (err) throw err;
      if (data) {
        return res.render('admin/signup', { title: 'Mobile', msg:"UserName Already Exit" });
      }
      next()
    })
  }
  

  router.get('/',checkLoginUser, function(req,res, next){
        res.render('admin/signup',{title:'Mobile',msg:''})
  })

  router.post('/',checkLoginUser, checkUserName,checkEmail, function(req, res, next) {
    var username = req.body.uname;
    var email = req.body.email;
    var password = req.body.password;
    var confpassword = req.body.confpassword;
  
    if(password != confpassword) {
      res.render('admin/signup', { title: 'Mobile', msg:'Password Not Matched!' });
    }
    else {
      password = bcrypt.hashSync(req.body.password, 10)
      var signupDetails = new signupModel({
        username:username,
        email:email,
        password:password,
      });
  
      signupDetails.save((err,doc)=>{
        if (err) throw err;
        res.render('admin/signup', { title: 'Mobile', msg:'User Register Successfully' });
      });
    }
    
  });
  

  module.exports = router;