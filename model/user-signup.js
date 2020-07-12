const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Mobile', {useNewUrlParser: true, useUnifiedTopology: true});
var conn =mongoose.Collection;

var signupSchema = new mongoose.Schema({
    username: {type: String, required: true, index: {unique: true}},
    fName: {type:String, required:true},
    email: {type: String, required: true, index: {unique: true}},
    phone: {type: String, required:true},
    city: {type:String, required:true},
    address:{type:String, required:true},
    password: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
  });

  var signupModel = mongoose.model('User Acount', signupSchema);

  module.exports = signupModel;