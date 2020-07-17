var express = require('express');
var router = express.Router();
var Cart = require('../model/cart');
var categoryModel = require('../model/category');
var category =categoryModel.find({});

var productModel = require('../model/product');
var product =productModel.find({}); 

var buyModel = require('../model/buy-product')
var buy = buyModel.find({})

var userModer = require('../model/user-signup')
var user = userModer.find({})

var nodemailer = require("nodemailer");


router.use(express.static(__dirname+"./public/"));

  // router.get('/', function(req,res, next){
  //   var productData

  //   product.exec(function(err, data){
  //     if(err) throw err
  //     productData= data
  //   })

  //     category.exec(function(err, data){
  //     res.render('client/buy-product',{title:'Mobile',productRecord:productData,categoryRecord:data,success:''})
  //     })
  // })

  // router.get('/', function(req,res, next){
  //   var loginUser = localStorage.getItem('loginUserInfo')

  //   var categoryData;
  //     category.exec(function(err, data){
  //     categoryData = data;
  //   })
  
  //   userModer.find({_id:loginUser}).exec(function(err, data){
  //     if(err) throw err
  //     res.render('client/checkout',{title:'Mobile',userRecord:data,categoryRecord:categoryData,success:''})
  //   })
  // })

  router.post('/', function(req, res, next){   
    var loginUser = req.session.userId
 
    var cat
    category.exec(function(err, data){
      if(err) throw err
      cat= data
    })
    var buyDetails = new buyModel({
      //  name:req.body.name,
      //  email:req.body.email,
      //  subject:req.body.subject,
      //  address:req.body.address,
       message:req.body.message,
      //  mobile:req.body.mobile,
      //  brand:req.body.brand,
      //  color:req.body.color,
      //  price:req.body.price,
      //  TotalPrice:req.body.TotalPrice,

      })


      var productsIDs = []
      var cart = new Cart(req.session.cart);
      var cartItems= cart.getItems();
      for (var i=0; i< cartItems.length; i++){
        // console.log("CARTTTT "+cartItems[i].item._id)
        productsIDs.push(cartItems[i].item._id)
        buyDetails.quantities.push(cartItems[i].quantity)
      }
      
      buyDetails.product = productsIDs
      var loginUser = req.session.userId
      buyDetails.user = loginUser
      // console.log(" details: " +buyDetails)

    buyDetails.save(function(err, data){
      if(err) throw err;
        res.redirect('/Order/Completed')
    })
  })


  module.exports = router;