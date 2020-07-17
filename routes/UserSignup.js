var express = require('express');
var router = express.Router();

var categoryModel = require('../model/category');
var category =categoryModel.find({});

var productModel = require('../model/product');
var product =productModel.find({}); 

var contactModel = require('../model/contactUs')
var contact = contactModel.find({})

var signupModel = require('../model/user-signup')
var signup = signupModel.find({})

router.use(express.static(__dirname+"./public/"));

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');




function checkEmail(req, res, next){
    var email= req.body.email;
    var checkExitEmail = signupModel.findOne({email:email});
    checkExitEmail.exec((err, data)=>{
      if (err) throw err;
      if (data) {
        return res.render('client/userSignup', { title: 'Mobile', msg:"Email Already Exit" });
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
        return res.render('client/userSignup', { title: 'Mobile', msg:"UserName Already Exit" });
      }
      next()
    })
  }
  
  router.get('/',function(req,res, next){
        res.render('client/userSignup',{title:'Mobile',msg:''})
  })

  
  router.post('/', checkUserName,checkEmail, function(req, res, next) {
    var username = req.body.uname;
    var fName = req.body.fName;
    var email = req.body.email;
    var phone = req.body.phone;
    var city = req.body.city;
    var address = req.body.address;
    var password = req.body.password;
    var confpassword = req.body.confpassword;
    
  
    if(password != confpassword) {
      res.render('client/userSignup', { title: 'Mobile', msg:'Password Not Matched!' });
    }
    else {
      password = bcrypt.hashSync(req.body.password, 10)
      var signupDetails = new signupModel({
        username:username,
        fName:fName,
        email:email,
        phone:phone,
        city:city,
        address:address,
        password:password,
      });
  
      signupDetails.save((err,doc)=>{
        if (err) throw err;
        res.render('client/userSignup', { title: 'Mobile', msg:'User Register Successfully' });
      });
    }
    
  });
  

  module.exports = router;