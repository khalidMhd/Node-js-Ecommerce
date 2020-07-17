var express = require('express');
var router = express.Router();
var multer  = require('multer')
var Cart = require('../model/cart');

var categoryModel = require('../model/category');
var category = categoryModel.find({}).sort({created_at: -1});
var nodemailer = require("nodemailer");

var productModel = require('../model/product');
var product = productModel.find({}).sort({created_at: -1});

var orderModel = require('../model/buy-product')
var order = orderModel.find({})

var userModel = require('../model/user-signup')
var user = userModel.find({})

var path = require('path');
router.use(express.static(__dirname+"./public/"));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage }).single('file')
var bcrypt = require('bcryptjs');
  
  var jwt = require('jsonwebtoken');
  
  //========== admin login ==========
  function checkLoginUser(req, res, next) {
      if(req.session.adminName) {
      } else{
        res.redirect('/admin')
      }
    next()
  }

//=============== client login ===========
  function checkUser(req, res, next) {

      if(req.session.userId){
      } else{
        res.redirect('/login')
      }
    next()
  }

/* GET home page. */
router.get('/', function(req, res, next) {
  var loginUser = req.session.userId

  var userdata
  userModel.find({_id:loginUser}).exec(function(err,data){
    if(err) throw err
    userdata = data
  })

  productModel.find({}).sort({created_at:-1}).limit(5).exec(function(err,productData){
    if (err) throw err
  category.exec(function(err, data){
    if(err) throw err
    res.render('index',{title:'Mobile', categoryRecord:data ,loginUserInfo:loginUser, latestProduct: productData,userData:userdata})
  })
})

});

/*=================== about us ============================ */
router.get('/about-us', function(req, res, next) {
  var loginUser = req.session.userId
  var userdata
  userModel.find({_id:loginUser}).exec(function(err,data){
    if(err) throw err
    userdata = data
  })

  category.exec(function(err,data){
    res.render('client/aboutus',{title:'Mobile',loginUserInfo:loginUser,categoryRecord:data,userData:userdata})

  })
});


/*=================== floating action button ============================ */
router.get('/action-button', function(req, res, next) {
 
    res.render('client/action_button',{title:'Mobile',})

});

/*=================== completed order ============================ */
router.get('/Order/Completed', function(req, res, next) {
  var loginUser = req.session.userId

  var userdata
  userModel.find({_id:loginUser}).exec(function(err,data){
    if(err) throw err
    userdata = data
  })

  product.limit(10).exec(function(err,productData){
    if(err) throw err
 

  category.exec(function(err,data){
    res.render('client/completedOreder',{title:'Mobile',loginUserInfo:loginUser,categoryRecord:data,productRecord:productData,userData:userdata})

  })
})
});

/*=================== Admin header ============================ */
router.get('/adminHeader',checkLoginUser, function(req, res, next) {
  var loginUser = req.session.adminName

  res.render('admin/adminHeader',{title:'Mobile',loginUser:loginUser})
});

/*=================== header ============================ */
router.get('/header', function(req, res, next) {
  var loginUser = req.session.userId

  var userdata
  userModel.find({_id:loginUser}).exec(function(err,data){
    if(err) throw err
    userdata = data
  })

 category.exec(function(err, data){
    if(err) throw err
    res.render('client/header',{title:'Mobile', categoryRecord:data,loginUserInfo:loginUser,userData:userdata})
  })
});

router.get('/Brands/:name', function(req, res, next) {
  var pages;
  var categoryData;
  category.exec(function(err, data){
    if(err) throw err;
    categoryData=data
  })

  var userdata
  userModel.find({_id:loginUser}).exec(function(err,data){
    if(err) throw err
    userdata = data
  })

  productModel.find({category:req.params.name}).sort({created_at: -1}).exec(function(err, data){
     if(err) throw err
     res.render('client/view-product',{title:'Mobile',
      prodectRecord:data,
      categoryRecord:categoryData,
      pages:pages,
      userData:userdata
    })
   })
 });

//================= footer =============================
router.get('/footer', function(req,res, next){
  var loginUser = req.session.userId
  var userdata
  userModel.find({_id:loginUser}).exec(function(err,data){
    if(err) throw err
    userdata = data
  })

  category.exec(function(err,data){
    res.render('client/footer',{title:'Mobile',categoryRecord:data,loginUserInfo:loginUser,userData:userdata})
  })
})

router.get('/brands/:name', function(req,res, next){
  var loginUser = req.session.userId
  var userdata
  userModel.find({_id:loginUser}).exec(function(err,data){
    if(err) throw err
    userdata = data
  })

  productModel.find({brand:req.params.name}).exec(function(err,data){
    res.render('client/view-product',{title:'Mobile',productRecord:data,loginUserInfo:loginUser, userData:userdata})
  })
})


//================= follow =============================
router.get('/follow', function(req,res, next){
  res.render('follow',{title:'Mobile',})
})

//================= latest product =============================
router.get('/latestProduct', function(req,res, next){
  var loginUser = req.session.userId

  var userdata
  userModel.find({_id:loginUser}).exec(function(err,data){
    if(err) throw err
    userdata = data
  })

  productModel.find({}).sort({created_at:-1}).limit(5).exec(function(err,data){
    if (err) throw err
    res.render('client/latestProduct',{title:'Mobile', latestProduct: data,loginUserInfo:loginUser,userData:userdata})
  })
})

//===================admin product ===========================
router.get('/admin/Brand/:name',checkLoginUser, function(req,res, next){
  var loginUser = req.session.adminName

  var pages;
  productModel.find({category:req.params.name}).sort({created_at: -1}).exec(function(err,data){
    if (err) throw err
    res.render('admin/admin-view-product',{title:'Mobile', 
    prodectRecord: data,
    pages:pages,
    loginUser:loginUser
    })
  })
})

//================= view category =============================
router.get('/view-category', function(req,res, next){
  var loginUser = req.session.userId
  var userdata
  userModel.find({_id:loginUser}).exec(function(err,data){
    if(err) throw err
    userdata = data
  })

  category.exec(function(err, data){
    if(err) throw err
    console.log(data)
    res.render('client/view-category',{title:'Mobile', categoryRecord:data,loginUserInfo:loginUser,userData:userdata})
  })
})


//================= view products =============================
router.get('/view-product', function(req,res, next){
  var loginUser = req.session.userId

  var userdata
  userModel.find({_id:loginUser}).exec(function(err,data){
    if(err) throw err
    userdata = data
  })
  var perPage = 12;
  var page = page || 1;
  var categoryData;

  category.exec(function(err, data){
    if(err) throw err
    categoryData=data;
  })

  product.skip((perPage * page) - perPage)
  .limit(perPage).exec(function(err,data){
    if(err) throw err;
    productModel.countDocuments({}).exec((err,count)=>{    
      res.render('client/view-product',{title:'Mobile', 
      loginUserInfo:loginUser,
      prodectRecord: data, 
      categoryRecord:categoryData,
      userData:userdata,
      current: page,
      pages: Math.ceil(count / perPage) 
    });
    });
  });
  product.exec(function(err,data){
  if(err) throw err;
  });
});

router.get('/view-product/:page', function(req,res, next){
  var loginUser = req.session.userId

  var userdata
  userModel.find({_id:loginUser}).exec(function(err,data){
    if(err) throw err
    userdata = data
  })

  var perPage = 12;
  var page =req.params.page || 1;
  var categoryData;

  category.exec(function(err, data){
    if(err) throw err
    categoryData=data;
  })

  product.skip((perPage * page) - perPage)
  .limit(perPage).exec(function(err,data){
    if(err) throw err;
    productModel.countDocuments({}).exec((err,count)=>{    
      res.render('client/view-product',{title:'Mobile',
      loginUserInfo:loginUser,
      prodectRecord: data, 
      categoryRecord:categoryData,
      userData:userdata,
      current: page,
      pages: Math.ceil(count / perPage) 
    });
    });
  });
  product.exec(function(err,data){
  if(err) throw err;
  });
});

router.get('/Brand/:name', function(req,res, next){
  var loginUser = req.session.userId
  var userdata
  userModel.find({_id:loginUser}).exec(function(err,data){
    if(err) throw err
    userdata = data
  })

  var pages;
  category.exec(function(err, categoryData){
    if(err) throw err

  productModel.find({category:req.params.name}).sort({created_at: -1}).exec(function(err,data){
    if (err) throw err
    res.render('client/view-product',{title:'Mobile', 
    loginUserInfo:loginUser,
    prodectRecord: data, 
    categoryRecord:categoryData,
    pages:pages,
    userData:userdata
    })
  })
})

})

//================= product Details =============================
router.get('/productDetails/:id', function(req,res, next){
  var loginUser = req.session.userId

  var userdata
  userModel.find({_id:loginUser}).exec(function(err,data){
    if(err) throw err
    userdata = data
  })

  category.exec(function(err, categoryData){
    if(err) throw err

  productModel.find({_id:req.params.id}).exec(function(err,data){
    if (err) throw err
    res.render('client/productDetails',{title:'Mobile',
    loginUserInfo:loginUser,
     prodectRecord: data,
      categoryRecord:categoryData,
      userData:userdata
    })

    })
  })
})

//======= auto complete search ==============
    
router.get('/autocompleteSearch/', function(req, res, next) {

  var regex= new RegExp(req.query["term"],'i');
 
  var productFilter =productModel.find({brand:regex},{'brand':1}).sort({"created_at":-1}).limit(20);
  productFilter.exec(function(err,data){

var result=[];
if(!err){
   if(data && data.length && data.length>0){
     data.forEach(user=>{
       let obj={
         id:user._id,
         label: user.brand
       };
       result.push(obj);
     });
   }
   res.jsonp(result);
  }
  });
});


/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
      user: "", // your emain address
      pass: "" // your password
  }
});

/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/

// app.get('/',function(req,res){
//   res.sendfile('index.html');
// });
router.get('/send',function(req,res){
  var mailOptions={
    from: "Mobile Shop <Mobile@test.com>", // sender address
      to : req.query.to,
      subject : "Thank you for shopping with us!",
      // text : " Our agent contacr you soon "+ req.query.text,
      html: '<h1>Thanks for shoping!</h1><p>Our call agent will contact you in few hours for order confirmation</p><h4>Order Details</h4>'+ req.query.text +'<p>For more shoping <a href="https://ecommerce-dem0.herokuapp.com/"> click me </a></p>'
    }
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function(error, response){
   if(error){
          console.log(error);
      res.end("error");
   }else{
          console.log("Message sent: " + response.message);
      res.end("sent");
       }
});
});

//================== cart =================
router.get('/buy-product/:id', function(req, res, next) {
  var loginUser = req.session.userId

  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  productModel.findOne({ _id: productId }, function (err, data) {
    cart.add(data, productId);
    req.session.cart = cart;
    res.redirect('/checkout');
  });
  
});

router.get('/add/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  productModel.findOne({ _id: productId }, function (err, data) {
    cart.add(data, productId);
    req.session.cart = cart;
    res.redirect('/cart');
  });
  
});

router.get('/cart', function(req, res, next) {
  var loginUser = req.session.userId

  userModel.find({_id:loginUser}).exec(function(err,userdata){
    if(err) throw err
  

  category.exec(function(err, data){
    if(err) throw err;

    if (!req.session.cart) {
    return res.render('client/cart', {title: 'Mobile',categoryRecord: data, products: '',loginUserInfo:loginUser,userData:userdata});
  }

  var cart = new Cart(req.session.cart);
  console.log("CART ITEMS"+JSON.stringify(cart.getItems()))
  res.render('client/cart', {title: 'Mobile',categoryRecord: data, products: cart.getItems(), totalPrice: cart.totalPrice,loginUserInfo:loginUser, userData:userdata});
});
})
})

router.get('/remove/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.remove(productId);
  req.session.cart = cart;
  res.redirect('/cart');
});

router.get('/reduce/:id', function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.reduceByOne(productId);
  req.session.cart = cart;    
  res.redirect('/cart');
}); 

router.get('/increment/:id', function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.addByOne(productId);
  req.session.cart = cart;    
  res.redirect('/cart');
}); 

//================== checkout ===================
router.get('/checkout',checkUser, function(req, res,next){
  var loginUser = req.session.userId
  var cart = new Cart(req.session.cart);

  userModel.find({_id:loginUser}).exec(function(err,userdata){
    if(err) throw err

  var catRec
  category.exec(function(err,data){
    if(err) throw err;
    catRec = data
  })

  userModel.find({_id:loginUser}).exec(function(err, data){
    if(err) throw err
    res.render('client/checkout',{title:'Mobile',userRecord:data,products: cart.getItems(), categoryRecord:catRec,totalPrice: cart.totalPrice,loginUserInfo:loginUser, userData:userdata})
  })
})

router.post('/edit-orderInfo/:id', function(req, res, next){
  var profileId = req.params.id;
  userModel.findByIdAndUpdate(profileId,{
    phone: req.body.phone,
    city: req.body.city,
    address: req.body.address
  }).exec(function(err){
      if(err) throw err;
      res.redirect('/checkout/')
})
})
  
})

//================== update order status ==================
router.post('/admin/viewOrder/:id',checkLoginUser, function(req, res, next){
  var statusId = req.params.id;
  orderModel.findByIdAndUpdate(statusId,{
    status: req.body.UpdateStatus
  }).exec(function(err){
      if(err) throw err;
      res.redirect('/admin/viewOrder')
})
})


//==================user profile======================

router.get('/user-Profile/:id',function(req,res, next){
  var loginUser = req.session.userId

  var userdata
  userModel.find({_id:loginUser}).exec(function(err,data){
    if(err) throw err
    userdata = data
  })

category.exec(function(err, catdata){
  if(err) throw err


  userModel.find({_id:req.params.id}).exec(function(err,data){
    if(err) throw err
    res.render('client/userProfile',{title:'Mobile',userRecord:data,categoryRecord:catdata,loginUserInfo:loginUser,userData:userdata})
  })
})

})

//================== update userProfile ==================
router.post('/edit-profile/:id', function(req, res, next){
  var profileId = req.params.id;
  userModel.findByIdAndUpdate(profileId,{
    fName: req.body.fname,
    phone: req.body.phone,
    city: req.body.city,
    address: req.body.address
  }).exec(function(err){
      if(err) throw err;
      res.redirect('/user-Profile/'+profileId)
})
})

//=============== user orders ================
router.get('/my-order',function(req,res,next){
  var loginUser = req.session.userId

  var userdata
  userModel.find({_id:loginUser}).exec(function(err,data){
    if(err) throw err
    userdata = data
  })

  category.exec(function(err,catdata){
    if(err) throw err
 

  orderModel.find({user:loginUser}).populate('product').exec(function(err,data){
    if(err) throw err
    console.log('user order'+data)
    res.render('client/userOrder',{title:'Mobile',userOrder:data,categoryRecord:catdata,loginUserInfo:loginUser, userData:userdata})
  })
})
})

// ============admin logout ==============
router.get('/logout',checkLoginUser,function(req, res, next) {
  req.session.destroy(function(err){
    if(err) throw err
      res.redirect('/admin')
  })
});

//=============== user logout
router.get('/Userlogout',function(req, res, next) {
  req.session.destroy(function(err){
    if(err) throw err
      res.redirect('/')
  })
});

module.exports = router;
