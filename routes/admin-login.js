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

var bcrypt = require('bcryptjs');

  var jwt = require('jsonwebtoken');
  
  // function checkLoginUser(req, res, next) {
  //   var userToken = localStorage.getItem("userToken");
  //   try {
  //     var decoded = jwt.verify(userToken, 'loginToken');
  //   } catch(err) {
  //     res.redirect('/admin/login')
  //   }
  //   next()
  // }

  
  router.get('/', function(req,res, next){
    var loginUser = localStorage.getItem('loginUser')
    if(loginUser) {
      res.redirect('/admin/dashboard')
    }
    else {
      res.render('admin/login',{title:'Mobile',msg:''})
    }
  })


  router.post('/', function(req, res, next) {
    var userName = req.body.uname;
    var password = req.body.password
    var checkUser = signupModel.findOne({username:userName});
    checkUser.exec((err, data)=>{
      if(data == null) {
        res.render('admin/login', { title: 'Mobile', msg:"Invalid userName and Password." });
      } else {
        if (err) throw err
      var getUserId = data._id
      var getPassword = data.password;
      if (bcrypt.compareSync(password, getPassword)) {
        var token = jwt.sign({ userId: getUserId }, 'loginToken');
        // localStorage.setItem('userToken', token);
        // localStorage.setItem('loginUser', userName);
        req.session.adminName = userName
  
        res.redirect('/admin/dashboard');
      }
      else {
        res.render('admin/login', { title: 'Mobile', msg:"Invalid userName and Password." });
      }
    }})
  });

  

  module.exports = router;