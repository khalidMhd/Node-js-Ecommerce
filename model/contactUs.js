const mongoose = require('mongoose')
var Schema = mongoose.Schema
var conn =mongoose.Collection;

var contactSchma =new mongoose.Schema({
	name: {type: String, required:true},
    email: {type: String, required:true},
    subject:{type: String, required:true},
    message: {type: String, required:true},
    mobile: {type: String, required:true},
    counter: {type: Number,default:0},
    created_at: {type: Date, default: Date.now},
});

var contactModel = mongoose.model('contact', contactSchma);

module.exports=contactModel;