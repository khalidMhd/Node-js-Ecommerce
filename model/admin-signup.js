const mongoose = require('mongoose')
var conn =mongoose.Collection;
var Schema = mongoose.Schema

var signupSchema = new mongoose.Schema({
    username: {type: String, required: true, index: {unique: true}},
    email: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
  });

  var signupModel = mongoose.model('admin Acount', signupSchema);

  module.exports = signupModel;