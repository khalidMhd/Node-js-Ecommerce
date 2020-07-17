var express = require('express');
var router = express.Router();
var multer  = require('multer')

var categoryModel = require('../model/category');
var path = require('path');
router.use(express.static(__dirname+"./public/"));


var jwt = require('jsonwebtoken');

function checkLoginUser(req, res, next) {
  if(req.session.adminName) {
  } else{
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

  router.get('/',checkLoginUser, function(req, res, next) {
    var loginUser = req.session.adminName
    res.render('admin/add-category', { title:'Mobile',success:'',loginUser:loginUser });
  });

  router.post('/',checkLoginUser, upload,function(req,res,next){
    var loginUser = req.session.adminName

    var categoryDetails = new categoryModel({
        name:req.body.categoryName,
        details: req.body.categorydetails,
        image: req.file.filename
    })
    categoryDetails.save(function(err, data){
        if(err) throw err
        res.render('admin/add-category', {title:'Mobile',success:'Record Inserted Successfully',loginUser:loginUser})
    })
  })

module.exports=router