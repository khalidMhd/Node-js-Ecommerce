var express = require('express');
var router = express.Router();

var categoryModel = require('../model/category');
var category =categoryModel.find({});

var productModel = require('../model/product');
var product =productModel.find({}); 
var multer  = require('multer')

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

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage }).single('file')

  router.get('/',checkLoginUser, function(req,res, next){
    var loginUser = localStorage.getItem('loginUser')

    category.exec(function(err, data){
      if(err) throw err
      res.render('admin/admin-view-category',{title:'Hassan',categoryRecord:data,loginUser:loginUser})
    })
  })

  router.get('/delete/:id',checkLoginUser, function(req,res, next){
    var loginUser = localStorage.getItem('loginUser')

    categoryModel.findByIdAndDelete({_id:req.params.id}).exec(function(err){
    if(err) throw err
    category.exec(function(err,data){
      res.redirect('/admin/ViewCategory')
    })
    })
  })

  

  module.exports = router;