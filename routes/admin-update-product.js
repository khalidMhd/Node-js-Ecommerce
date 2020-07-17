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


  router.get('/edit/:id',checkLoginUser, function(req, res, next) {
    var loginUser = req.session.adminName
    var id = req.params.id;

    var catRec;
    category.exec(function(err,catData){
        if(err) throw err
        catRec = catData
    })

    productModel.findById({_id:id}).exec(function(err,data){
        if(err) throw err;
        res.render('admin/edit_product', { title:'Mobile',success:'', productRecord:data,loginUser:loginUser,categoryRecord:catRec});
    })
  
  });


  router.post('/:id',checkLoginUser,upload, function(req, res, next) {
    var loginUser = req.session.adminName
    var id = req.params.id;

    var catRec;
    category.exec(function(err,catData){
        if(err) throw err
        catRec = catData
    })

    var productdetails = productModel.findByIdAndUpdate(id,{
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
        // images: req.files.filename
    })

    // for(var i = 0; i < req.files.length; i++) {
    //     productdetails.images[i] = req.files[i] && req.files[i].filename ? req.files[i].filename : ''
    //   }

    productdetails.exec(function(err){
        if(err) throw err;
    productModel.findById({_id:id}).exec(function(err,data){
        if(err) throw err;
        res.render('admin/edit_product', { title:'Mobile',success:'', productRecord:data,loginUser:loginUser,categoryRecord:catRec, success:'Updated Successfully'});
    })
    })

  });



  module.exports = router;