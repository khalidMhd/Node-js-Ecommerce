var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
const mongoose = require('mongoose')
mongoose.connect('mongodb://admin:admin1234@ecommerce-shard-00-00.vm2d7.mongodb.net:27017,ecommerce-shard-00-01.vm2d7.mongodb.net:27017,ecommerce-shard-00-02.vm2d7.mongodb.net:27017/mobile?ssl=true&replicaSet=atlas-mr5408-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
var conn =mongoose.Collection;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var addCategoryRouter = require('./routes/add-category');
var addproductRouter = require('./routes/add-product');
var contactRouter = require('./routes/contactUs');
var admindashboardRouter = require('./routes/admin-dashboard');
var buyProductRouter = require('./routes/buy-product');
var adminViewCategoryRouter = require('./routes/admin-view-category');
var adminViewProductRouter = require('./routes/admin-view-product');
var viewOrderRouter = require('./routes/view-order');
var viewContactRouter = require('./routes/view-contact');
var searchRouter = require('./routes/client-search');
var adminSearchRouter = require('./routes/admin-search');
var adminSignupRouter = require('./routes/admin-signup');
var adminLoginRouter = require('./routes/admin-login');
var adminViewRouter = require('./routes/view-admin-account');
var adminUpdateCategoryRouter = require('./routes/admin-update-category');
var adminupdateproductRouter = require('./routes/admin-update-product');
var signup = require('./routes/UserSignup');
var login = require('./routes/userLogin');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'cartdemo',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/add-category',addCategoryRouter)
app.use('/admin/add-product',addproductRouter)
app.use('/contact-us',contactRouter)
app.use('/admin/dashboard',admindashboardRouter)
app.use('/buy-product',buyProductRouter)
app.use('/admin/ViewCategory',adminViewCategoryRouter)
app.use('/admin/ViewProduct',adminViewProductRouter)
app.use('/admin/viewOrder',viewOrderRouter)
app.use('/admin/viewContact',viewContactRouter)
app.use('/search',searchRouter)
app.use('/admin/search',adminSearchRouter)
app.use('/admin/signup',adminSignupRouter)
app.use('/admin',adminLoginRouter)
app.use('/admin/viewAccount',adminViewRouter)
app.use('/admin/update-category',adminUpdateCategoryRouter)
app.use('/admin/update-product',adminupdateproductRouter)
app.use('/signup',signup)
app.use('/login',login)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
