const mongoose = require('mongoose');
var Schema = mongoose.Schema
var conn =mongoose.Collection;
var Schema = mongoose.Schema

var productSchema =new mongoose.Schema({

    brand: {type:String, required:true},
    ram: {type:String, required:true},
    rom: {type:String, required:true},
    rearcamera: {type:String, required:true},
    fontcamera: {type:String, required:true},
	battery: {type:String, required:true},
    simSupport: {type:String, required:true},
    color: {type:String, required:true},
    operatingSystem: {type:String, required:true},
    warranty: {type:String, required:true},
    pta: {type:String, required:true},
    price: {type:Number, required:true},
    images: [String],
    category: String,
    created_at: {type:Date, required:true, default:Date.now}

});

var productModel = mongoose.model('product', productSchema);
module.exports=productModel;