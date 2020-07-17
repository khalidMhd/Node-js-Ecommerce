var express = require('express');
var router = express.Router();

var categoryModel = require('../model/category');
var category =categoryModel.find({});

var productModel = require('../model/product');
var product =productModel.find({}); 

var contactModel = require('../model/contactUs')
var contact = contactModel.find({})

var userModel = require('../model/user-signup')

router.use(express.static(__dirname+"./public/"));

  router.get('/', function(req,res, next){
    var loginUser = req.session.userId

    var userdata
    userModel.find({_id:loginUser}).exec(function(err,data){
      if(err) throw err
      userdata = data
    })

    contact.sort({created_at: -1}).limit(1).exec(function(err,contactData){
      if(err) throw err
    
      category.exec(function(err, data){
        res.render('client/contact_us',{title:'Mobile',contactRecord:contactData,categoryRecord:data,success:'',loginUserInfo:loginUser,userData:userdata})
      })
    })
  })

  router.post('/', function(req, res, next){
    var loginUser = req.session.userId

    var userdata
    userModel.find({_id:loginUser}).exec(function(err,data){
      if(err) throw err
      userdata = data
    })

    var cat;
    category.exec(function(err, data){
      cat= data
    })
    var contactDetails = new contactModel({
       name:req.body.name,
       email:req.body.email,
       subject:req.body.subject,
       message:req.body.message,
       mobile:req.body.mobile,
       counter:req.body.counter
    })
    contactDetails.save(function(err, data1){
      if(err) throw err
      contact.exec(function(err,data){
        if(err) throw err
        res.render('client/contact_us',{title:'Mobile',contactRecord:data,categoryRecord:cat, success:'Message send successfully',loginUserInfo:loginUser,userData:userdata})

      })
    })
  })

  module.exports = router;