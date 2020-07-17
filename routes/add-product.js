var express = require('express');
var router = express.Router();

var productModel = require('../model/product');
var categoryModel = require('../model/category');
var category = categoryModel.find({});
var multer  = require('multer');
var path = require('path');
router.use(express.static(__dirname+"./public/"));

var Storage= multer.diskStorage({
  destination:"./public/uploads/",
  filename:(req,file,cb)=>{
    cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
  }
});

var upload = multer({
  storage:Storage
}).any('file');

var jwt = require('jsonwebtoken');

function checkLoginUser(req, res, next) {
  if(req.session.adminName) {
  } else{
    res.redirect('/admin')
  }
next()
}

  router.get('/',checkLoginUser, function(req, res, next) {
    var loginUser = req.session.adminName

    category.exec(function(err, data){
      if(err) throw err;
      res.render('admin/add-product', { title:'Mobile',success:'', categoryRecord:data,loginUser:loginUser});
    })
  }); 

  router.post('/',checkLoginUser,upload, function(req, res, next){
    var loginUser = req.session.adminName

      var productDetails = new productModel({
        brand: req.body.brand,
        ram: req.body.ram,
        rom: req.body.rom,
        rearcamera: req.body.rearcamera,
        fontcamera: req.body.fontcamera,
        battery: req.body.battery,
        simSupport: req.body.simSupport,
        color: req.body.color,
        operatingSystem: req.body.operatingSystem,
        warranty: req.body.warranty,
        pta: req.body.pta,
        price: req.body.price,
        category:req.body.category,      

      })

      for(var i = 0; i < req.files.length; i++) {
        productDetails.images[i] = req.files[i] && req.files[i].filename ? req.files[i].filename : ''
      }

      var categoryData;
      category.exec(function(err, data){
        if(err) throw err;
        categoryData = data;
      })

      productDetails.save(function(err, data){
          if(err) throw err;
          console.log(data)
          res.render('admin/add-product', { title:'Mobile',success:'Recorded Added Successfully',categoryRecord:categoryData,loginUser:loginUser });
      })
  })

  module.exports = router;