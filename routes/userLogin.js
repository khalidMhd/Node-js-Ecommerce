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
 
var bcrypt = require('bcryptjs');

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
  
  var jwt = require('jsonwebtoken');

  router.get('/', function(req,res, next){
    res.render('client/userLogin',{title:'Mobile',msg:''})
  })

  router.post('/', function(req, res, next) {
    var userName = req.body.uname;
    var password = req.body.password
    var checkUser = signupModel.findOne({username:userName});
    checkUser.exec((err, data)=>{
      if(data == null) {
        res.render('client/userLogin', { title: 'Mobile', msg:"Invalid userName and Password." });
      } else {
        if (err) throw err
      var getUserId = data._id
      var getPassword = data.password;
      if (bcrypt.compareSync(password, getPassword)) {
        var token = jwt.sign({ userId: getUserId }, 'userloginToken');
        // localStorage.setItem('userInfoToken', token);
        // localStorage.setItem('loginUserInfo', getUserId);
        req.session.userId = getUserId
        // console.log('login userrrrrr'+req.session.userId)
        res.redirect('/');
      }
      else {
        res.render('client/userLogin', { title: 'Mobile', msg:"Invalid userName and Password." });
      }
    }})
  });

  module.exports = router;